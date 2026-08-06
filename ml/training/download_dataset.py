import os
import urllib.request

def download_uci_dataset():
    url = "https://raw.githubusercontent.com/gabbygab1233/Crop-Recommender/main/Crop_recommendation.csv"
    target_dir = r"d:\Techrush\ml\datasets"
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, "crop_recommendation.csv")
    
    print(f"Downloading UCI Crop Recommendation dataset from {url}...")
    try:
        urllib.request.urlretrieve(url, target_path)
        print(f"Dataset successfully saved to {target_path}")
    except Exception as e:
        print(f"Download failed: {e}")

if __name__ == "__main__":
    download_uci_dataset()
