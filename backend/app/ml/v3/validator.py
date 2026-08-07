"""Input validator layer for physical constraints and scientific training boundaries."""

import numpy as np

def validate_inputs(query: dict, bounds: dict) -> dict:
    """
    Validates inputs for type safety, physical sanity, and training-domain scope.
    
    Args:
        query: dictionary containing input parameters.
        bounds: feature bounds from metadata.json.
        
    Returns:
        dict: {
            "valid": bool,
            "status": str,  # "success", "validation_error", "out_of_scope"
            "message": str,
            "field_errors": dict or list
        }
    """
    physical_limits = {
        "N": (0.0, float('inf')),
        "P": (0.0, float('inf')),
        "K": (0.0, float('inf')),
        "temperature": (-20.0, 60.0),
        "humidity": (0.0, 100.0),
        "ph": (0.0, 14.0),
        "rainfall": (0.0, float('inf'))
    }
    
    validation_errors = {}
    out_of_scope_errors = []
    
    for feat in ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]:
        if feat not in query:
            validation_errors[feat] = f"Field '{feat}' is missing."
            continue
            
        val = query.get(feat)
        
        # Check null/None
        if val is None:
            validation_errors[feat] = f"Field '{feat}' cannot be empty."
            continue
            
        # Check numeric conversions
        try:
            val_f = float(val)
        except (ValueError, TypeError):
            validation_errors[feat] = f"Field '{feat}' must be a valid number."
            continue
            
        # Reject NaN & Infinity
        if np.isnan(val_f) or np.isinf(val_f):
            validation_errors[feat] = f"Field '{feat}' contains an invalid numeric value (NaN/Inf)."
            continue
            
        # Check physical bounds
        p_min, p_max = physical_limits[feat]
        if val_f < p_min or val_f > p_max:
            if feat == "ph":
                validation_errors[feat] = f"Soil pH must be between 0.0 and 14.0."
            elif feat == "humidity":
                validation_errors[feat] = f"Humidity percentage must be between 0% and 100%."
            else:
                validation_errors[feat] = f"Field '{feat}' value is physically impossible ({val_f})."
            continue
            
        # Check model range bounds
        feat_bounds = bounds.get(feat, {})
        if feat_bounds:
            f_min = feat_bounds["min"]
            f_max = feat_bounds["max"]
            if val_f < f_min or val_f > f_max:
                out_of_scope_errors.append({
                    "field": feat,
                    "value": val_f,
                    "supported_min": round(f_min, 2),
                    "supported_max": round(f_max, 2),
                    "message": f"Field '{feat}' is outside the model's training range."
                })
                
    if validation_errors:
        return {
            "valid": False,
            "status": "validation_error",
            "message": "Please correct the invalid fields.",
            "field_errors": validation_errors
        }
        
    if out_of_scope_errors:
        return {
            "valid": False,
            "status": "out_of_scope",
            "message": "The entered values are outside the supported prediction range.",
            "field_errors": out_of_scope_errors,
            "recommendation": "Please enter values within the supported model domain."
        }
        
    return {"valid": True, "status": "success"}
