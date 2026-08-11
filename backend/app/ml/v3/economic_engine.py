"""Profit-First Agricultural Decision Intelligence Engine.

Operates as a completely independent decision layer on top of core ML crop suitability predictions.
Does NOT alter or inject non-agronomic parameters into the core 7-feature model.
"""

import os
import json
import logging

logger = logging.getLogger(__name__)

class EconomicEngine:
    def __init__(self, data_path=None):
        if data_path is None:
            _file_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.join(_file_dir, "economic_data.json")
        self.data_path = data_path
        self.crop_economics = {}
        self.load_data()

    def load_data(self):
        try:
            if os.path.exists(self.data_path):
                with open(self.data_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.crop_economics = data.get("crops", {})
            else:
                logger.warning(f"Economic data file not found at {self.data_path}")
        except Exception as e:
            logger.error(f"Failed to load economic data: {str(e)}")

    def compute_crop_economics(
        self,
        crop_id: str,
        ml_suitability_pct: float,
        farm_area_ha: float = 1.0,
        irrigation_type: str = "rainfed",
        district: str = None
    ) -> dict:
        profile = self.crop_economics.get(crop_id.lower(), {})
        
        # Fallbacks if crop not in economic DB
        yield_q_ha = profile.get("expected_yield_q_ha", 20.0)
        market_price = profile.get("market_price_inr_q", 3500)
        cost_ha = profile.get("cost_of_cultivation_inr_ha", 40000)
        water_mm = profile.get("water_requirement_mm", 500)
        water_level = profile.get("water_demand_level", "Medium")
        climate_risk = profile.get("climate_risk_score", 0.30)
        price_risk = profile.get("price_volatility_score", 0.25)
        crop_name = profile.get("crop_name", crop_id.capitalize())
        category = profile.get("category", "General")
        source = profile.get("source", "CACP / DES Benchmarks")
        source_url = profile.get("source_url", "https://eands.dacnet.nic.in")
        year = profile.get("year", "2023-2024")
        data_status = profile.get("data_status", "estimated")

        # Irrigation adjustment to climate risk
        if irrigation_type.lower() in ["drip", "sprinkler", "canal", "borewell"]:
            if water_level in ["High", "Very High"]:
                climate_risk = max(0.10, climate_risk * 0.70)
        elif irrigation_type.lower() == "rainfed":
            if water_level in ["High", "Very High"]:
                climate_risk = min(0.95, climate_risk * 1.35)

        # Basic financial calculations
        total_production_q = round(yield_q_ha * farm_area_ha, 1)
        expected_revenue = round(yield_q_ha * farm_area_ha * market_price, 2)
        total_cost = round(cost_ha * farm_area_ha, 2)
        expected_profit = round(expected_revenue - total_cost, 2)

        # Composite risk score (0.0 to 1.0)
        combined_risk_score = round(0.50 * climate_risk + 0.50 * price_risk, 3)
        risk_adjusted_profit = round(expected_profit * (1.0 - combined_risk_score), 2)

        # Overall Economic Signal: Strong 🟢, Moderate 🟡, Risky 🟠
        if combined_risk_score <= 0.30 and expected_profit > 0:
            economic_signal = "Strong 🟢"
            signal_badge = "Strong"
            signal_color = "emerald"
        elif combined_risk_score <= 0.45 and expected_profit > 0:
            economic_signal = "Moderate 🟡"
            signal_badge = "Moderate"
            signal_color = "amber"
        else:
            economic_signal = "Risky 🟠"
            signal_badge = "Risky"
            signal_color = "rose"

        # Overall decision score combining ML suitability and risk-adjusted economic performance
        ml_weight = 0.50
        econ_weight = 0.50

        # Normalized economic score (benchmark: max profit baseline ~ 200,000 INR/ha)
        norm_econ_score = min(100.0, max(0.0, (risk_adjusted_profit / max(1.0, farm_area_ha)) / 2000.0))
        overall_score = round(ml_weight * ml_suitability_pct + econ_weight * norm_econ_score, 1)

        return {
            "crop_id": crop_id,
            "crop_name": crop_name,
            "category": category,
            "ml_suitability_pct": round(ml_suitability_pct, 1),
            "expected_yield_q_ha": yield_q_ha,
            "total_production_q": total_production_q,
            "market_price_inr_q": market_price,
            "cost_of_cultivation_inr_ha": cost_ha,
            "total_cost_inr": total_cost,
            "expected_revenue_inr": expected_revenue,
            "expected_profit_inr": expected_profit,
            "water_requirement_mm": water_mm,
            "water_demand_level": water_level,
            "climate_risk_score": round(climate_risk, 2),
            "price_volatility_score": round(price_risk, 2),
            "combined_risk_score": combined_risk_score,
            "economic_signal": economic_signal,
            "signal_badge": signal_badge,
            "signal_color": signal_color,
            "risk_adjusted_profit_inr": risk_adjusted_profit,
            "overall_decision_score": overall_score,
            "data_source": source,
            "source_url": source_url,
            "data_year": year,
            "data_status": data_status
        }

    def rank_recommendations(
        self,
        recommendations: list,
        farm_area_ha: float = 1.0,
        irrigation_type: str = "rainfed",
        district: str = None
    ) -> dict:
        """
        Ranks top ML predictions based on Risk-Adjusted Economic Returns.
        Returns detailed financial comparison breakdown.
        Does NOT alter or modify core ML suitability probabilities.
        """
        evaluations = []
        for rec in recommendations:
            crop_id = rec.get("crop", "unknown")
            prob = rec.get("probability", rec.get("confidence", 0.8))
            confidence_pct = prob * 100.0 if prob <= 1.0 else prob
            econ = self.compute_crop_economics(
                crop_id=crop_id,
                ml_suitability_pct=confidence_pct,
                farm_area_ha=farm_area_ha,
                irrigation_type=irrigation_type,
                district=district
            )
            evaluations.append(econ)

        # Sort by Risk-Adjusted Return
        sorted_by_risk_profit = sorted(evaluations, key=lambda x: x["risk_adjusted_profit_inr"], reverse=True)

        top_ml_crop = recommendations[0]["crop"] if recommendations else None
        top_risk_adjusted_crop = sorted_by_risk_profit[0]["crop_id"] if sorted_by_risk_profit else None

        # Strategic Callout: Highest suitability != highest economic recommendation
        has_divergence = (top_ml_crop != top_risk_adjusted_crop)
        insight_summary = ""
        if has_divergence and sorted_by_risk_profit:
            top_rec = sorted_by_risk_profit[0]
            insight_summary = (
                f"Agronomic suitability is highest for {top_ml_crop.capitalize()} ({(recommendations[0].get('probability', 0.9)*100):.1f}%), "
                f"but {top_rec['crop_name']} yields higher risk-adjusted profit (₹{top_rec['risk_adjusted_profit_inr']:,.0f}) "
                f"due to lower water demand ({top_rec['water_demand_level']}) and lower market risk. "
                f"Highest suitability ≠ highest economic recommendation."
            )
        else:
            insight_summary = (
                f"{top_ml_crop.capitalize() if top_ml_crop else ''} offers both top agronomic suitability "
                f"and optimal risk-adjusted economic returns."
            )

        return {
            "farm_parameters": {
                "farm_area_ha": farm_area_ha,
                "irrigation_type": irrigation_type,
                "district": district or "Maharashtra Default Region"
            },
            "insight_summary": insight_summary,
            "has_suitability_profit_divergence": has_divergence,
            "top_risk_adjusted_crop": top_risk_adjusted_crop,
            "profit_table": sorted_by_risk_profit
        }

economic_engine = EconomicEngine()
