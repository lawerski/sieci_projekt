import os
import shutil
import yaml
import argparse
from datetime import datetime


def load_config():
    config_file = "config.yaml"
    if not os.path.exists(config_file):
        print("Błąd: Plik config.yaml nie został znaleziony.")
        exit(1)

        with open(config_file, 'r') as file:
            return yaml.safe_load(file)


def create_directories(library_path, formats):
    if not os.path.exists(library_path):
        os.makedirs(library_path)

    for file_format in formats:
        folder_name = file_format.upper().replace('.', '')
        folder_path = os.path.join(library_path, folder_name)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)


def add_ebooks(path, library_path, formats):
    if not os.path.exists(path):
        print(f"Błąd: Ścieżka {path} nie istnieje.")
        return

    for root, _, files in os.walk(path):
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in formats:
                dest_folder = os.path.join(library_path, ext.upper().replace('.', ''))
                dest_path = os.path.join(dest_folder, file)

                if os.path.exists(dest_path):
                    response = input(f"Plik {file} już istnieje w {dest_folder}. Nadpisać? (t/n): ").strip().lower()
                    if response != 'y':
                        continue

                shutil.move(os.path.join(root, file), dest_path)
                print(f"Przeniesiono: {file} do {dest_folder}")


def show_library(library_path, formats):
    for file_format in formats:
        folder_name = file_format.upper().replace('.', '')
        folder_path = os.path.join(library_path, folder_name)
        print(f"Zawartość folderu {folder_name}: ")
        if os.path.exists(folder_path):
            files = os.listdir(folder_path)
        if files:
            for file in files:
                print(f"  {file}")
            else:
                print("  (pusty)")
        else:
                print("  Folder nie istnieje.")


def archive_library(library_path):
    backup_folder = os.path.join(library_path, "backup")
    if not os.path.exists(backup_folder):
        os.makedirs(backup_folder)

    archive_name = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    archive_path = os.path.join(backup_folder, archive_name)

    shutil.make_archive(archive_path, 'zip', library_path)
    print(f"Biblioteka została zarchiwizowana w {archive_path}.zip")


def main():
    config = load_config()
    library_path = config.get("library_path")
    formats = config.get("formats", [])

    parser = argparse.ArgumentParser(description="Ebook Manager")
    parser.add_argument("command", choices=["add", "show", "archive"], help="Command to execute")
    parser.add_argument("path", nargs="?", help="Path for the add command")

    args = parser.parse_args()

    create_directories(library_path, formats)

    if args.command == "add":
        if not args.path:
            print("Błąd: Ścieżka jest wymagana dla polecenia dodaj.")
        else:
            print(f"Dodawanie e-booków z {args.path} do biblioteki...")
            add_ebooks(args.path, library_path, formats)

    elif args.command == "show":
        print("Zawartość biblioteki:")
        show_library(library_path, formats)

    elif args.command == "archive":
        print("Archiwizowanie biblioteki...")
        archive_library(library_path)


if __name__ == "__main__":
    main()
