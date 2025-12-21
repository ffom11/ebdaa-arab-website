#!/usr/bin/env python3
import ftplib
import os
from pathlib import Path

# FTP credentials
FTP_HOST = "ftp.hostinger.com"
FTP_USER = "5atera.3abera@gmail.com"
FTP_PASS = "RaMi1233211"
FTP_PATH = "/"

# Local files directory
LOCAL_PATH = "C:/Users/Huawei/CascadeProjects/ebdaa-website/deploy"

def upload_file(ftp, local_path, remote_path):
    """Upload a single file"""
    try:
        with open(local_path, 'rb') as file:
            ftp.storbinary(f'STOR {remote_path}', file)
            print(f"Uploaded: {local_path} -> {remote_path}")
    except Exception as e:
        print(f"Error uploading {local_path}: {e}")

def upload_directory(ftp, local_dir, remote_dir):
    """Upload entire directory"""
    for root, dirs, files in os.walk(local_dir):
        for file in files:
            local_path = os.path.join(root, file)
            # Calculate relative path
            rel_path = os.path.relpath(local_path, local_dir)
            rel_path_fixed = rel_path.replace('\\', '/')
            remote_path = f"{remote_dir}/{rel_path_fixed}"
            
            # Create remote directory if needed
            remote_dir_path = os.path.dirname(remote_path)
            try:
                ftp.mkd(remote_dir_path)
            except:
                pass  # Directory might already exist
            
            upload_file(ftp, local_path, remote_path)

def main():
    try:
        print("Connecting to Hostinger FTP...")
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER, FTP_PASS)
        
        print(f"Connected to {FTP_HOST}")
        print("Uploading files...")
        
        # Change to public_html directory
        try:
            ftp.cwd("public_html")
        except:
            ftp.mkd("public_html")
            ftp.cwd("public_html")
        
        # Upload all files
        upload_directory(ftp, LOCAL_PATH, "")
        
        print("Upload completed successfully!")
        print("Your website should be live now.")
        
        ftp.quit()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
