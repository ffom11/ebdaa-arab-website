@echo off
echo ==========================================
echo    مؤسسة إبداع العرب - النشر السريع
echo ==========================================
echo.

echo بيانات FTP:
echo Host: ftp.hostinger.com
echo User: 5atera.3abera@gmail.com
echo Pass: RaMi1233211
echo.

echo الخطوات:
echo 1. افتح FileZilla أو أي عميل FTP
echo 2. استخدم البيانات أعلاه للاتصال
echo 3. اذهب إلى مجلد public_html
echo 4. ارفع جميع الملفات من مجلد deploy
echo.

echo الملفات المطلوبة:
echo - index.html
echo - css/style.css
echo - js/script.js
echo - images/ (كامل المجلد)
echo - admin/ (كامل المجلد)
echo - .htaccess
echo - robots.txt
echo - sitemap.xml
echo.

echo فتح مجلد deploy...
start "" "C:\Users\Huawei\CascadeProjects\ebdaa-website\deploy"

echo.
echo بعد الرفع، اختبر الموقع على:
echo - الصفحة الرئيسية: http://your-domain.com
echo - لوحة التحكم: http://your-domain.com/admin/
echo - صفحة الطلبات: http://your-domain.com/admin/requests.html
echo.

pause
