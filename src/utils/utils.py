import kagglehub
import os
import shutil
from rich import print as rprint
def download_dataset_from_kaggle(dataset_name: str, path: str = os.path.join(os.path.dirname(__file__), '..', 'data')):
    if os.path.exists(path):
        shutil.rmtree(path)

    downloaded_path = kagglehub.dataset_download(dataset_name)
    shutil.move(downloaded_path , path)
    rprint(f"Dataset downloaded to {path}")
    return path
    
    






if __name__ == "__main__":
    download_dataset_from_kaggle("odedgolden/movielens-1m-dataset", "data/mv-lens-1m")