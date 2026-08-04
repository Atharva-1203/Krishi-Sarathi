# Phase 2 Rainfall Data Quality and Inconsistency Report

This report evaluates database, syntax, spelling, and completeness issues identified in the Maharain portal rainfall reports.

## 1. Severely Malformed HTML Markup
- **Missing `<tr>` Tags**: The server's PHP report script output has a critical markup error: it outputs a closing `</tr>` tag at the beginning of each row (e.g. `</tr><td>District</td>`) but fails to output the opening `<tr>` tag. This causes standard HTML parsers to skip these rows unless regex preprocessing is applied to restore them.
- **Incorrect `<dth>` Tags**: The closing tag for numeric columns is printed as `<dth>` instead of `</td>` (e.g., `<td>461.9<dth>`). This must be clean-replaced with `</td>` to construct a valid DOM tree.

## 2. District nomenclature and Spelling Variations
The portal uses localized spellings for several districts. These must be standardized to match external databases:
- `Raigadh` (standard: `Raigad`)
- `Parabhani` (standard: `Parbhani`)
- `Ahilyanagar` (standard: `Ahmednagar`)
- `Nasik` (standard: `Nashik` - used as division key)
- `Bid` (standard: `Beed` - used in WMS Geoserver but spelled `Beed` in the dropdown here)

## 3. District Omissions
- **Mumbai City** and **Mumbai Suburban** are completely omitted from the rainfall database. Since these districts have negligible agricultural activity and no active rain gauges under the Agriculture Commissionerate, they do not impact the crop recommendation system.

## 4. Administrative Boundary Discrepancies (Palghar vs Thane)
- Unlike Phase 1 (where the soil database merged Palghar into Thane), the rainfall database **separately tracks Palghar** (Maharain code 35) and Thane (Maharain code 2). This means that:
  - 2015-2025 rainfall data is available for Palghar.
  - If we join this rainfall database with the soil database, Palghar's weather data must be intersected with Thane's soil mappings, or assigned to the Thane soil association class.

## 5. Verification status
- All 11 years (2015 to 2025) contain exactly **34 district records**, totaling **374 observations**.
- No nulls or missing numeric values exist in the monthly columns (June, July, August, September).
- There are no duplicate records in any year-district combination.
