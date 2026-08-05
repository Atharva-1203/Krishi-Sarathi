# Krishi Sarathi - Interaction Flow

Details the step-by-step user journey flow.

## 1. Steps
1. **User Landing**: Reads 779K dataset metrics.
2. **Analysis Trigger**: Clicks CTA redirecting to Prediction wizard.
3. **Form Submissions**: Enters soil parameters. Zod validates bounds.
4. **API Ping**: Client requests FastAPI endpoint on port 8000.
5. **Loading Shimmer**: Shimmer placeholders block inputs during inference calculation.
6. **Results Plotting**: Displays suitabilities, SHAPs, and local explanations.
7. **Report Print**: Clicks export, launching printable browser sheets.
8. **History logging**: Appends predictions to recent history drawer.
