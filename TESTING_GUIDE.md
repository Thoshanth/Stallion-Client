# Stallion CMS - Testing Guide

**Last Updated:** August 17, 2026  
**Purpose:** Step-by-step guide to test the updated Trainer CMS

---

## 🚀 Quick Start

### 1. Access the Admin Panel
1. Open your browser
2. Navigate to: `http://localhost:3001/admin/login`
3. Login with your credentials:
   - Email: Your admin email
   - Password: Your admin password

### 2. Navigate to Trainers
- Click on "Trainers" in the left sidebar
- You should see the new dark-themed interface

---

## ✅ Testing Checklist

### Design & UI Tests

#### **Visual Inspection**
- [ ] Page background is dark (#262626)
- [ ] Sidebar is black with gradient accent
- [ ] Main heading uses Akira font (uppercase, bold)
- [ ] Body text uses Degular font
- [ ] Primary buttons are red (#e71b4b)
- [ ] Stats cards have gradient backgrounds
- [ ] Icons are visible and color-coded

#### **Interactive Elements**
- [ ] Hover over navigation items - should show hover effect
- [ ] Hover over table rows - should highlight
- [ ] Hover over buttons - should scale up slightly
- [ ] Focus on input fields - should show red ring
- [ ] Click search box - should have proper focus state

---

### Functional Tests

#### **Test 1: View Trainers List**
**Steps:**
1. Go to `/admin/trainers`
2. Check if trainers load (or show empty state)
3. Check if stats cards show correct numbers
4. Verify table headers are visible

**Expected:**
- ✅ Trainers list loads without errors
- ✅ Stats cards display correct counts
- ✅ Table is readable and styled properly
- ✅ If no trainers, "Add Your First Trainer" button shows

---

#### **Test 2: Search & Filter**
**Steps:**
1. Type a trainer name in the search box
2. Select a branch from the dropdown
3. Select a status filter
4. Clear filters and verify list resets

**Expected:**
- ✅ Search filters trainers in real-time
- ✅ Branch filter works correctly
- ✅ Status filter works correctly
- ✅ Multiple filters work together
- ✅ Clearing filters shows all trainers

---

#### **Test 3: Create New Trainer**
**Steps:**
1. Click "Add New Trainer" button
2. Modal should open with dark theme
3. Fill in the form:
   - Name: "Test Trainer"
   - Designation: "Senior Coach"
   - Biography: "Experienced fitness coach with 10+ years of expertise in strength training and nutrition."
   - Experience: 10
   - Branch: Select any branch
   - Specialization: Add "Strength Training", "Nutrition"
   - Display Order: 1
   - Status: Active
   - Published State: Published
4. Upload a profile image (optional)
5. Click "Create Trainer"

**Expected:**
- ✅ Modal opens with dark theme and proper styling
- ✅ All form fields are visible and functional
- ✅ Image upload button works
- ✅ Specialization tags can be added/removed
- ✅ Experience field accepts numbers only
- ✅ Form validates required fields
- ✅ On submit, trainer is created successfully
- ✅ Modal closes after successful creation
- ✅ New trainer appears in the list
- ✅ Stats cards update with new count

---

#### **Test 4: Edit Existing Trainer**
**Steps:**
1. Click the edit icon (pencil) on any trainer row
2. Modal should open with trainer data pre-filled
3. Change the designation to "Head Coach"
4. Change experience to 15
5. Add a new specialization
6. Click "Update Trainer"

**Expected:**
- ✅ Modal opens with trainer data loaded
- ✅ All fields are editable
- ✅ Image preview shows current image
- ✅ Changes save successfully
- ✅ Modal closes after update
- ✅ Trainer row updates with new data

---

#### **Test 5: Delete Trainer**
**Steps:**
1. Click the delete icon (trash) on any trainer row
2. Delete confirmation modal should open
3. Click "Cancel" first
4. Click delete again
5. Click "Delete" to confirm

**Expected:**
- ✅ Delete modal opens with dark theme and red accents
- ✅ Warning message is clear
- ✅ Cancel button closes modal without deleting
- ✅ Delete button removes trainer
- ✅ Trainer disappears from list
- ✅ Stats cards update
- ✅ Success message shows

---

#### **Test 6: Image Upload**
**Steps:**
1. Open create/edit trainer modal
2. Click "Upload Image" button
3. Select an image file
4. Verify image preview shows
5. Save the trainer
6. Check if image appears in the table

**Expected:**
- ✅ File picker opens
- ✅ Image previews immediately after selection
- ✅ Image uploads to Cloudinary on save
- ✅ Image shows in trainer row after save
- ✅ Image loads properly from CDN

---

#### **Test 7: Form Validation**
**Steps:**
1. Open create trainer modal
2. Try to submit without filling required fields
3. Try to enter invalid data:
   - Very short name (< 2 characters)
   - Very short designation (< 2 characters)
   - Very short biography (< 10 characters)
   - Negative experience
   - Experience > 50 years
4. Check error messages

**Expected:**
- ✅ Form prevents submission if required fields are empty
- ✅ Red asterisk shows on required fields
- ✅ Validation errors show appropriate messages
- ✅ Invalid data is rejected
- ✅ Valid data is accepted

---

### Responsiveness Tests

#### **Desktop (1920px)**
- [ ] All elements are properly spaced
- [ ] Table is readable without scrolling
- [ ] Sidebar is visible
- [ ] Stats cards are in 4 columns

#### **Laptop (1366px)**
- [ ] Layout adjusts appropriately
- [ ] Table may scroll horizontally
- [ ] Stats cards remain in 4 columns or adjust to 2

#### **Tablet (768px)**
- [ ] Stats cards stack to 2 columns
- [ ] Table scrolls horizontally
- [ ] Buttons remain accessible
- [ ] Modals fit the screen

#### **Mobile (375px)**
- [ ] Stats cards stack to 1 column
- [ ] Search and filters stack vertically
- [ ] Table scrolls horizontally
- [ ] Modals are full-width
- [ ] Sidebar behavior (should be hidden or collapsible)

---

## 🐛 Bug Reporting

If you find any issues, please note:

1. **What were you doing?**
2. **What did you expect to happen?**
3. **What actually happened?**
4. **Can you reproduce it?**
5. **Browser and screen size?**
6. **Any console errors?** (Press F12 → Console tab)

---

## 📊 Performance Checks

### Loading Speed
- [ ] Page loads within 2 seconds
- [ ] Trainer list loads quickly
- [ ] Images load progressively
- [ ] No layout shifts during load

### Browser Console
- [ ] No JavaScript errors (red messages)
- [ ] No missing resources (404 errors)
- [ ] No CSS warnings

---

## 🎯 Success Criteria

### Must Pass (Critical)
- ✅ Can create a new trainer
- ✅ Can edit an existing trainer
- ✅ Can delete a trainer
- ✅ Images upload successfully
- ✅ Search and filters work
- ✅ Form validation works
- ✅ No console errors

### Should Pass (Important)
- ✅ Design matches main website
- ✅ Animations are smooth
- ✅ Hover effects work
- ✅ Loading states show
- ✅ Empty states show
- ✅ Mobile responsive

### Nice to Have (Enhancement)
- ✅ Keyboard navigation works
- ✅ Fast page loads
- ✅ Smooth transitions
- ✅ Accessible for screen readers

---

## 🔍 Known Issues to Check

### Validation Issue (RESOLVED)
- ~~Previously: Experience and displayOrder fields sent as strings~~
- ✅ Fixed: Validation now accepts strings and converts to numbers

### Port Conflict
- If frontend shows port 3001 instead of 3000, it's normal
- Backend should always be on port 5000

---

## 📞 Next Steps After Testing

1. **If all tests pass:**
   - Document any minor UI improvements needed
   - Move to next feature: Events Management

2. **If tests fail:**
   - Document the failures with screenshots
   - Check browser console for errors
   - Try in a different browser
   - Clear browser cache and retry

3. **Additional features to add:**
   - Toast notifications for success/error
   - Loading skeletons for better UX
   - Bulk operations (delete multiple, export)
   - Advanced search (by specialization, experience range)
   - Sorting options (by name, experience, date)

---

**Happy Testing! 🚀**

Remember: The goal is to ensure the trainer management system is fully functional and visually consistent with the main website.
