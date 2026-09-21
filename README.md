# Nexora AI — داشبورد، اپ دسکتاپ و اندروید

یک کلاینت کامل برای ایجنت n8n شما (React + Vite + Tailwind). یک کدبیس، سه خروجی:
**وب/داشبورد**، **دسکتاپ (Electron: Windows / macOS / Linux)** و **اندروید (Capacitor)**.

## امکانات
- ورود / ثبت‌نام (متصل به workflow ‏`Nexora AI - Sign in / Sign up`)
- گفتگوی استریم با ایجنت اصلی، مارک‌داون، کپی کد، تولید دوباره، توقف، خروجی گرفتن، سنجاق/تغییر نام/حذف گفتگو
- پیوست عکس / ویدیو / فایل در گفتگو (drag & drop)، ورودی صوتی، کلیدهای «جست‌وجوی وب» و «تفکر عمیق»
- استودیو تصویر (سبک، نسبت، تصویر مرجع برای ویرایش) و استودیو ویدیو (Veo) + گالری
- کتابخانه رسانه: آپلود عکس و فیلم، پیش‌نمایش، دانلود، «پرسیدن از هوش مصنوعی»
- داشبورد: آمار، وضعیت سرور، گفتگوهای اخیر، توانایی‌ها
- تم روشن/تیره/سیستم، فارسی (RTL) و انگلیسی
- تمام داده‌ها (گفتگوها، رسانه‌ها) روی خود دستگاه ذخیره می‌شوند

## راه‌اندازی سریع
```bash
npm install
cp .env.example .env      # آدرس n8n خودت را بگذار (یا داخل خود اپ تنظیم کن)
npm run dev               # داشبورد وب روی http://localhost:5173
```

## ۱) لازم است در n8n این‌ها را انجام بدهی
1. هر سه workflow را **Publish / Active** کن (آدرس production فعال باشد، نه test).
2. **Chat Trigger** → Options: `Allowed Origins (CORS)` = `*` ، و برای آپلود فایل گزینه‌ی `Allow File Uploads` را روشن کن.
   (برای اینکه ایجنت عکس‌ها را ببیند در نود Agent گزینه‌ی `Automatically Passthrough Binary Images` را روشن کن.)
3. نود Webhook های Sign in/up: `Allowed Origins` = `*` (پیش‌فرض همین است).
4. n8n باید روی **HTTPS** و آدرس عمومی باشد (برای اندروید ضروری است).
5. شناسه‌ی وب‌هوک گفتگو در فایل شما `943bbb75-f73f-4204-ba8d-a5dfa7a13ade` است و پیش‌فرض اپ هم همین است
   (در Settings قابل تغییر). آدرس نهایی: `https://<n8n>/webhook/<id>/chat`.

## ۲) اپ دسکتاپ
```bash
npm run electron:dev      # اجرا برای توسعه
npm run electron:build    # ساخت نصب‌کننده در پوشه release/
```
ویندوز: `.exe` (نصب‌کننده + portable) — مک: `.dmg` (روی مک بساز) — لینوکس: `.AppImage` و `.deb`.

## ۳) اپ اندروید (پوشه‌ی `android/` آماده است)
**روش A — با Android Studio:**
```bash
npm run android:sync
npm run android:open      # در Android Studio: Build > Build APK(s)
```
**روش B — خط فرمان (JDK 21 + Android SDK):**
```bash
npm run android:apk       # خروجی: android/app/build/outputs/apk/debug/app-debug.apk
```
**روش C — بدون نصب چیزی روی سیستم:** پروژه را در GitHub بگذار؛ workflow آماده‌ی
`.github/workflows/build.yml` فایل APK و نصب‌کننده‌های دسکتاپ را می‌سازد
(secret به نام `N8N_BASE_URL` را اضافه کن).

برای انتشار در Google Play باید APK را با keystore خودت امضا کنی (`assembleRelease` یا Build > Generate Signed Bundle).

## لوگو و آیکون‌ها
- `public/logo-mark.svg`, `logo-mark-light.svg`, `logo-full.svg` — نسخه‌ی سیاه/سفید
- تولید دوباره‌ی همه‌ی PNG ها: `npm run icons` ؛ آیکون اندروید: `npx @capacitor/assets generate --android --assetPath resources`

## نکته‌ها
- لینک ویدیوی Veo (`generativelanguage.googleapis.com/...`) برای دانلود به کلید API جمنای نیاز دارد؛ اپ لینک را نشان می‌دهد.
  برای پخش مستقیم، بهتر است در workflow ویدیو، فایل را دانلود و روی یک storage عمومی (S3/Supabase Storage) آپلود کنی و آن URL را برگردانی.
- ساخت ویدیو چند دقیقه طول می‌کشد؛ اگر جلوی n8n پروکسی (مثل Cloudflare) دارید، timeout آن (معمولاً ۱۰۰ ثانیه) ممکن است اتصال را قطع کند.
- ورود فعلی فقط ایمیل/رمز را در Data Table چک می‌کند و توکن نمی‌دهد؛ وب‌هوک گفتگو هم عمومی است. برای امنیت بیشتر بعداً JWT/Header Auth اضافه کن.
- فایل‌های اصلی workflow ها در `n8n-workflows/` کپی شده‌اند.
