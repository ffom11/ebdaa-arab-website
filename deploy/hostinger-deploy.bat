@echo off
echo Starting deployment to Hostinger...
echo.

REM Set FTP credentials
set FTP_HOST=ftp.hostinger.com
set FTP_USER=5atera.3abera@gmail.com
set FTP_PASS=RaMi1233211
set FTP_PATH=/

REM Create FTP script file
echo open %FTP_HOST% > ftp_commands.txt
echo %FTP_USER% >> ftp_commands.txt
echo %FTP_PASS% >> ftp_commands.txt
echo cd %FTP_PATH% >> ftp_commands.txt
echo mkdir public_html >> ftp_commands.txt
echo cd public_html >> ftp_commands.txt
echo binary >> ftp_commands.txt

REM Upload all files
echo mdeploy *.html >> ftp_commands.txt
echo mdeploy css\*.css >> ftp_commands.txt
echo mdeploy js\*.js >> ftp_commands.txt
echo mdeploy images\*.jpg >> ftp_commands.txt
echo mdeploy images\*.png >> ftp_commands.txt
echo mdeploy images\portfolio\*.jpg >> ftp_commands.txt
echo mdeploy images\partners\*.png >> ftp_commands.txt
echo mdeploy admin\*.html >> ftp_commands.txt
echo mdeploy admin\*.js >> ftp_commands.txt
echo mdeploy admin\*.css >> ftp_commands.txt
echo mdeploy *.txt >> ftp_commands.txt
echo mdeploy *.xml >> ftp_commands.txt
echo mdeploy .htaccess >> ftp_commands.txt

echo quit >> ftp_commands.txt

echo Uploading files to Hostinger...
ftp -s:ftp_commands.txt

echo.
echo Deployment completed!
echo Your website should be live at: http://your-domain.com
pause
