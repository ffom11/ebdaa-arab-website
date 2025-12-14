# Auto Deploy Script for Hostinger
$ftpHost = "ftp.hostinger.com"
$ftpUser = "5atera.3abera@gmail.com"
$ftpPass = "RaMi1233211"
$localPath = "C:\Users\Huawei\CascadeProjects\ebdaa-website\deploy"
$remotePath = "/public_html"

Write-Host "Connecting to Hostinger FTP..." -ForegroundColor Green

# Create FTP request
$ftp = [System.Net.FtpWebRequest]::Create("ftp://$ftpHost$remotePath")
$ftp.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
$ftp.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory

try {
    $response = $ftp.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    
    Write-Host "Connected successfully!" -ForegroundColor Green
    Write-Host "Uploading files..." -ForegroundColor Yellow
    
    # Upload function
    function Upload-File($localFile, $remoteFile) {
        $uri = "ftp://$ftpHost$remotePath/$remoteFile"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        
        $content = [System.IO.File]::ReadAllBytes($localFile)
        $request.ContentLength = $content.Length
        
        $stream = $request.GetRequestStream()
        $stream.Write($content, 0, $content.Length)
        $stream.Close()
        
        Write-Host "Uploaded: $remoteFile" -ForegroundColor Cyan
    }
    
    # Upload main files
    Upload-File "$localPath\index.html" "index.html"
    Upload-File "$localPath\.htaccess" ".htaccess"
    Upload-File "$localPath\robots.txt" "robots.txt"
    Upload-File "$localPath\sitemap.xml" "sitemap.xml"
    
    # Upload CSS folder
    Upload-File "$localPath\css\style.css" "css/style.css"
    
    # Upload JS folder
    Upload-File "$localPath\js\script.js" "js/script.js"
    
    # Upload images
    Get-ChildItem "$localPath\images\*.jpg" | ForEach-Object {
        Upload-File $_.FullName "images/$($_.Name)"
    }
    
    Get-ChildItem "$localPath\images\*.png" | ForEach-Object {
        Upload-File $_.FullName "images/$($_.Name)"
    }
    
    # Upload portfolio images
    Get-ChildItem "$localPath\images\portfolio\*.jpg" | ForEach-Object {
        Upload-File $_.FullName "images/portfolio/$($_.Name)"
    }
    
    # Upload partner images
    Get-ChildItem "$localPath\images\partners\*.png" | ForEach-Object {
        Upload-File $_.FullName "images/partners/$($_.Name)"
    }
    
    # Upload admin files
    Upload-File "$localPath\admin\index.html" "admin/index.html"
    Upload-File "$localPath\admin\requests.html" "admin/requests.html"
    Upload-File "$localPath\admin\requests.js" "admin/requests.js"
    Upload-File "$localPath\admin\admin.css" "admin/admin.css"
    
    Write-Host "Deployment completed successfully!" -ForegroundColor Green
    Write-Host "Your website is now live!" -ForegroundColor Green
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
