# SeYaha API Documentation | توثيق API سياحة

This documentation provides details for the SeYaha Smart Tourism Platform API.
هذا الملف يحتوي على توثيق شامل لجميع نقاط النهاية (Endpoints) الخاصة بمنصة سياحة.

---

## 🚀 Base URL | رابط السيرفر الأساسي
`https://se-yaha.vercel.app`

---

## 🔐 Authentication | المصادقة

All private routes require a Bearer Token in the `Authorization` header:
جميع المسارات الخاصة تتطلب توكن (Token) في الهيدر:
`Authorization: Bearer <your_token>`

### 1. Register | تسجيل مستخدم جديد
- **Endpoint:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "Test User",
    "email": "traveler@test.com",
    "password": "123456",
    "role": "User" // Or "Manager", "Admin", "TourGuide"
  }
  ```

### 2. Login | تسجيل الدخول
- **Endpoint:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "traveler@test.com",
    "password": "123456"
  }
  ```

### 3. Get Me | جلب بياناتي الشخصية
- **Endpoint:** `GET /api/auth/me`
- **Auth:** Required

### 4. Update Details | تحديث البيانات الشخصية
- **Endpoint:** `PUT /api/auth/updatedetails`
- **Auth:** Required
- **Body:**
  ```json
  {
    "name": "New Name",
    "email": "newemail@test.com"
  }
  ```

### 5. Forgot Password | نسيت كلمة المرور
- **Endpoint:** `POST /api/auth/forgotpassword`
- **Auth:** Not Required
- **Description:** Sends a 6-digit OTP to the user's email (valid for 10 minutes).
- **Body:**
  ```json
  {
    "email": "traveler@test.com"
  }
  ```

### 6. Verify OTP | التحقق من الرمز
- **Endpoint:** `POST /api/auth/verifyotp`
- **Auth:** Not Required
- **Description:** Verifies the OTP and returns a short-lived `resetToken` (valid for 5 minutes).
- **Body:**
  ```json
  {
    "email": "traveler@test.com",
    "otp": "123456"
  }
  ```

### 7. Reset Password | إعادة تعيين كلمة المرور
- **Endpoint:** `PUT /api/auth/resetpassword`
- **Auth:** Not Required (requires `resetToken`)
- **Description:** Sets the new password and returns a login token.
- **Body:**
  ```json
  {
    "resetToken": "jwt_reset_token_here",
    "newPassword": "newpassword123"
  }
  ```

---

## 👥 Users (Admin Only) | المستخدمين (خاص بالأدمن)

### 1. Get All Users | جلب جميع المستخدمين
- **Endpoint:** `GET /api/users`
- **Auth:** Required (Admin)

### 2. Delete User | حذف مستخدم
- **Endpoint:** `DELETE /api/users/:user_id`
- **Auth:** Required (Admin)

### 3. Get All Tour Guides | جلب جميع المرشدين السياحيين
- **Endpoint:** `GET /api/users/tour-guides`
- **Auth:** Required (Any authenticated user)
- **Description:** Returns a list of all users with the "TourGuide" role.
- **الوصف:** يعيد قائمة بجميع المستخدمين الذين يمتلكون صلاحية "مرشد سياحي".

---

## 🏢 Companies | الشركات

### 1. Get All Companies | جلب جميع الشركات
- **Endpoint:** `GET /api/companies`
- **Auth:** Public

### 2. Create Company | إنشاء شركة
- **Endpoint:** `POST /api/companies`
- **Auth:** Required
- **Body:**
  ```json
  {
    "name": "SeYaha Tours",
    "category": "Tours",
    "description": "Premium tours across Egypt.",
    "address": "123 Nile St, Cairo",
    "phone": "+20123456789"
  }
  ```

### 3. Approve Company | الموافقة على الشركة
- **Endpoint:** `PUT /api/companies/:company_id/status`
- **Auth:** Required (Admin)
- **Body:** `{"approved": true}`

---

## 🛡️ Services | الخدمات

### 1. Get All Services | جلب جميع الخدمات
- **Endpoint:** `GET /api/services?page=1&limit=10&search=`
- **Auth:** Public

### 2. Get Single Service | جلب خدمة محددة
- **Endpoint:** `GET /api/services/:service_id`
- **Auth:** Public

### 3. Create Service | إضافة خدمة جديدة
- **Endpoint:** `POST /api/services`
- **Auth:** Required
- **Body:**
  ```json
  {
    "title": "Cairo Night Tour",
    "description": "Explore the beauty of Cairo by night, visiting the Pyramids and Old Cairo.",
    "price": 50,
    "location": "Cairo",
    "category": "Tours",
    "company": "company_id",
    "images": ["image_url_1", "image_url_2"]
  }
  ```

---

## 📅 Bookings | الحجوزات

### 1. Create Booking | طلب حجز
- **Endpoint:** `POST /api/bookings`
- **Auth:** Required
- **Body:**
  ```json
  {
    "service": "service_id",
    "tourGuide": "user_id_of_tour_guide", // Optional: ID of the selected tour guide
    "dates": {
      "startDate": "2026-10-01",
      "endDate": "2026-10-05"
    },
    "notes": "Special request: Window seat if possible."
  }
  ```

### 2. Confirm/Update Status | تأكيد الحجز
- **Endpoint:** `PUT /api/bookings/:booking_id`
- **Auth:** Required
- **Body:** `{"status": "confirmed"}`

---

## 💬 Reviews & Messages | المراجعات والرسائل

### 1. Add Review | إضافة تقييم
- **Endpoint:** `POST /api/reviews`
- **Body:** `{"service": "id", "rating": 5, "comment": "..."}`

### 2. Chat History | سجل المحادثة
- **Endpoint:** `GET /api/messages/:booking_id`

### 3. Send Message | إرسال رسالة
- **Endpoint:** `POST /api/messages`
- **Body:** `{"booking": "id", "content": "Hello!"}`
