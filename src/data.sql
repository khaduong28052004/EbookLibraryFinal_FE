-- nhom quuyen 
-- + quan ly nguoi
create database ebookLibrary;

use ebookLibrary;

-- Thêm dữ liệu mẫu vào bảng Roles  (NHÓM QUYỀN)
INSERT INTO ebooklibrary.roles ( name, description) 
VALUES ('ADMIN', 'QUẢN TRỊ SÀN'),
        ('ADMINV1'  ,'QUẢN LÝ SÀN'),
        ('SELLER', 'SELLER role'),
       ('USER', 'Regular user role');
select * from ebooklibrary.roles
use ebooklibrary
select * from ebooklibrary.accounts

-- Thêm dữ liệu mẫu vào bảng Accounts (Tài khoản chính)
INSERT INTO ebooklibrary.accounts (afterIdImage, avatar, background, beforeIdImage, birthday, email, fullname, gender, numberId, password, phone, shopName, status, username, role_id)
VALUES 
('after_image_1.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_1.jpg', '1990-05-10', 'user1@example.com', 'John Doe', 1, 'id_image_1.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '1234567890', 'JohnADMIN', 1, 'JohnADMIN', 1),
('after_image_2.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_2.jpg', '1992-08-15', 'user2@example.com', 'Jane Smith', 0, 'id_image_2.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '0987654321', 'JaneADMINV1', 1, 'JaneADMINV1', 2),
('after_image_3.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_3.jpg', '1985-12-22', 'user3@example.com', 'Mike Johnson', 1, 'id_image_3.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '1122334455', 'MikeSELLER', 1, 'MikeSELLER', 3),
('after_image_4.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_4.jpg', '1995-03-03', 'kienlhpc05751@fpt.edu.vn', 'Anna Brown', 0, 'id_image_4.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '5566778899', 'AnnaSELLER', 1, 'AnnaSELLER', 3),
('after_image_5.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_5.jpg', '1998-07-21', 'user5@example.com', 'Chris Lee', 1, 'id_image_5.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '2233445566', 'chris_lee', 1, 'USER', 4),
('after_image_6.jpg', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2F01ecccb8-f35c-49ce-b872-948e9d34d116-doremon.jpg?alt=media', 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/background%2Fz5705770552061_77f95d973e9aae45f7cda44aa91ce48f.jpg?alt=media', 'before_image_6.jpg', '1980-10-30', 'hutaoptp@gmail.com', 'Lisa White', 0, 'id_image_6.jpg', '$2a$12$evYE/JRIQ/pS9p8ho1ZVpuVh7D/7etIe4euO.Ob6f6UMT6X5S1zfi', '0833094952', 'lisa_white', 1, 'USER1', 4);

SELECT * FROM accounts


-- Thêm dữ liệu mẫu vào bảng Permission

INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES 
('Create Product', 'CREATE_PRODUCT'),
('Read Product', 'READ_PRODUCT'),
('Update Product', 'UPDATE_PRODUCT'),
('Delete Product', 'DELETE_PRODUCT'),
('Update Status of Product', 'UPDATE_STATUS_PRODUCT');

-- Permissions for FLASHSALE
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Flashsale', 'CREATE_FLASHSALE'),
('Read Flashsale', 'READ_FLASHSALE'),
('Update Flashsale', 'UPDATE_FLASHSALE'),
('Delete Flashsale', 'DELETE_FLASHSALE');

-- Permissions for DISCOUNTRATE
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Discount Rate', 'CREATE_DISCOUNTRATE'),
('Read Discount Rate', 'READ_DISCOUNTRATE'),
('Update Discount Rate', 'UPDATE_DISCOUNTRATE'),
('Delete Discount Rate', 'DELETE_DISCOUNTRATE');

-- Permissions for VOUCHER
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Voucher', 'CREATE_VOUCHER'),
('Read Voucher', 'READ_VOUCHER'),
('Update Voucher', 'UPDATE_VOUCHER'),
('Delete Voucher', 'DELETE_VOUCHER'),
('Update Status of Voucher', 'UPDATE_STATUS_VOUCHER');

-- Permissions for ACCOUNT
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Account', 'CREATE_ACCOUNT'),
('Read Account', 'READ_ACCOUNT'),
('Update Account', 'UPDATE_ACCOUNT'),
('Delete Account', 'DELETE_ACCOUNT'),
('Update Status of Account', 'UPDATE_STATUS_ACCOUNT');

-- Permissions for CATEGORY
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Category', 'CREATE_CATEGORY'),
('Read Category', 'READ_CATEGORY'),
('Update Category', 'UPDATE_CATEGORY'),
('Delete Category', 'DELETE_CATEGORY'),
('Update Status of Category', 'UPDATE_STATUS_CATEGORY');

-- Permissions for BILL
INSERT INTO ebooklibrary.permissions(description, cotSlug) VALUES
('Create Bill', 'CREATE_BILL'),
('Read Bill', 'READ_BILL'),
('Update Bill', 'UPDATE_BILL'),
('Delete Bill', 'DELETE_BILL'),
('Update Status of Bill', 'UPDATE_STATUS_BILL');

-- Permissions for EVALUATE
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Evaluate', 'CREATE_EVALUATE'),
('Read Evaluate', 'READ_EVALUATE'),
('Update Evaluate', 'UPDATE_EVALUATE'),
('Delete Evaluate', 'DELETE_EVALUATE');

-- Permissions for ROLES_PERMISSION
INSERT INTO ebooklibrary.permissions (description, cotSlug) VALUES
('Create Roles Permission', 'CREATE_ROLES_PERMISSION'),
('Read Roles Permission', 'READ_ROLES_PERMISSION'),
('Update Roles Permission', 'UPDATE_ROLES_PERMISSION'),
('Delete Roles Permission', 'DELETE_ROLES_PERMISSION');


-- Thêm dữ liệu mẫu vào bảng Roles_permission (Ánh xạ quyền cho các vai trò)

INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p
WHERE r.name = 'ADMIN' 
AND p.cotSlug IN ('READ_PRODUCT', 'UPDATE_STATUS_PRODUCT');

-- ADMIN Permissions on PRODUCT (READ, UPDATE_STATUS)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('READ_PRODUCT', 'UPDATE_STATUS_PRODUCT');

-- ADMINV1 Permissions on PRODUCT (READ, UPDATE_STATUS)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMINV1' AND p.cotSlug IN ('READ_PRODUCT', 'UPDATE_STATUS_PRODUCT');

-- SELLER Permissions on PRODUCT (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'SELLER' AND p.cotSlug IN ('CREATE_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT', 'READ_PRODUCT');

-- USER Permissions on PRODUCT (READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'USER' AND p.cotSlug = 'READ_PRODUCT';


-- ADMIN Permissions on FLASHSALE (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('CREATE_FLASHSALE', 'UPDATE_FLASHSALE', 'DELETE_FLASHSALE', 'READ_FLASHSALE');

-- ADMINV1 Permissions on FLASHSALE (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMINV1' AND p.cotSlug IN ('CREATE_FLASHSALE', 'UPDATE_FLASHSALE', 'DELETE_FLASHSALE', 'READ_FLASHSALE');


----------------------------------------------------------
-- ADMIN Permissions on DISCOUNTRATE (CREATE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('CREATE_DISCOUNTRATE', 'READ_DISCOUNTRATE');
--------------------------------------------------------
-- ADMIN Permissions on VOUCHER (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('CREATE_VOUCHER', 'UPDATE_VOUCHER', 'DELETE_VOUCHER', 'READ_VOUCHER');

-- ADMINV1 Permissions on VOUCHER (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMINV1' AND p.cotSlug IN ('CREATE_VOUCHER', 'UPDATE_VOUCHER', 'DELETE_VOUCHER', 'READ_VOUCHER');

-- SELLER Permissions on VOUCHER (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'SELLER' AND p.cotSlug IN ('CREATE_VOUCHER', 'UPDATE_VOUCHER', 'DELETE_VOUCHER', 'READ_VOUCHER');

-- USER Permissions on VOUCHER (READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'USER' AND p.cotSlug = 'READ_VOUCHER';
-----------------------------------------------------------------
-- ADMIN Permissions on ACCOUNT (CREATE, UPDATE, DELETE, UPDATE_STATUS)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('CREATE_ACCOUNT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT', 'UPDATE_STATUS_ACCOUNT');

-- ADMINV1 Permissions on ACCOUNT (CREATE, UPDATE, DELETE)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMINV1' AND p.cotSlug IN ('CREATE_ACCOUNT', 'UPDATE_ACCOUNT', 'DELETE_ACCOUNT');

-- USER Permissions on ACCOUNT (READ, UPDATE)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'USER' AND p.cotSlug IN ('READ_ACCOUNT', 'UPDATE_ACCOUNT');
----------------------------------------------------------
-- SELLER Permissions on CATEGORY (CREATE, UPDATE, DELETE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'SELLER' AND p.cotSlug IN ('CREATE_CATEGORY', 'UPDATE_CATEGORY', 'DELETE_CATEGORY', 'READ_CATEGORY');
----------------------------------------------------------
-- USER Permissions on EVALUATE (CREATE, READ)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'USER' AND p.cotSlug IN ('CREATE_EVALUATE', 'READ_EVALUATE');
----------------------------------------------------------

-- ADMIN Permissions on BILL (READ, UPDATE, DELETE, UPDATE_STATUS)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('READ_BILL', 'UPDATE_BILL', 'DELETE_BILL', 'UPDATE_STATUS_BILL');

-- USER Permissions on BILL (READ, UPDATE_STATUS)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'USER' AND p.cotSlug IN ('READ_BILL', 'UPDATE_STATUS_BILL');


------------------------ROLES_PERMISSION----------------------------------
-- ADMIN Permissions on ROLES_PERMISSION (READ, UPDATE, DELETE)
INSERT INTO ebooklibrary.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'ADMIN' AND p.cotSlug IN ('READ_ROLES_PERMISSION', 'UPDATE_ROLES_PERMISSION', 'DELETE_ROLES_PERMISSION');

-- INSERT INTO ebooklibrary.permissions (role_id, permission_id) 
-- VALUES ( 1, 1),  -- ADMIN có quyền Manage Users
--        ( 1, 2),  -- ADMIN có quyền Manage Products
--        ( 1, 3),  -- ADMIN có quyền View Reports
--        ( 2, 3);  -- USER chỉ có quyền View Reports



