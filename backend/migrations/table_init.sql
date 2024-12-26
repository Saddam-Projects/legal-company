DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS service_term;
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS "references";
DROP TABLE IF EXISTS banner;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS client_logo;
DROP TABLE IF EXISTS blog;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS cloud_image;

CREATE TABLE service (
	name varchar(255) NOT NULL UNIQUE,
  price DOUBLE PRECISION NOT NULL,
  description TEXT NULL,
  image VARCHAR(255) NULL,
  
  id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL  
);

CREATE TABLE banner (
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
	image TEXT NULL,
  
	created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL
);

CREATE TABLE client_logo(
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
	image TEXT NULL,
  "name" VARCHAR(255) NULL,
  
	created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL
);

CREATE TABLE gallery(
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
	image TEXT NULL,
  
	created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL
);


CREATE TABLE service_term(
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  term_name varchar(255) NOT NULL,
  service_id VARCHAR(255) NOT NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL
);

CREATE  TABLE customer(
  id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL
);

CREATE TABLE "order"(
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  total_price DOUBLE PRECISION NOT NULL,
  	
  customer_id VARCHAR(36) NOT NULL,
  description Text NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY(customer_id) references customer(id)
);


CREATE TABLE "order_item"(
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  
  order_id VARCHAR(36) NOT NULL,
  service_id VARCHAR(36) NOT NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY(order_id) references "order"(id),
  FOREIGN KEY(service_id) references service(id)
);


CREATE TABLE "references" (
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  
  address TEXT NOT NULL,
  company_phone VARCHAR(15) NOT NULL,
  company_email VARCHAR(255) NOT NULL,
  address_lat VARCHAR(255) NULL,
  address_long VARCHAR(255) NULL,
  company_logo varchar(255) NOT NULL,
  company_name varchar(255) NOT NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL

);

CREATE TABLE "blog" (
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  author VARCHAR(255) NULL,
  category_id varchar(36),
  cover TEXT NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL

);

CREATE TABLE "cloud_image" (
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
 	url TEXT,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL

);

CREATE TABLE "category" (
	id VARCHAR(36) DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  
  created_at TIMESTAMP default CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  is_deleted SMALLINT default 0,
	deleted_at TIMESTAMP NULL

);


ALTER TABLE blog
ADD CONSTRAINT fk_blog_category
FOREIGN KEY (category_id) REFERENCES category(id);


INSERT INTO "references"(
  address, company_phone, company_email, address_lat, address_long, company_logo, company_name
)
VALUES
(
  'Lagoon Premium Office Lt. UG Unit 33 Lagoon Avenue Mall Bekasi Kawasan Grand Kamala Lagoon Jl. Chandrabhaga RT.006/RW.003 Jawa Barat Bekasi Selatan Pekayonjaya',
  '082321419003',
  'ptarunikaindomiratama@gmail.com',
  '-6.2508211',
  '106.9760332',
  'company-logo.png',
  'PT. Arunika Indo Miratama'
);

insert into "category" ("category_name", "created_at", "deleted_at", "id", "is_deleted", "updated_at") values ('about us', '2024-12-26 06:21:17.962909', NULL, 'd5306162-4163-4cdf-b142-d79a2a6ff5b3', 0, '2024-12-26 06:21:17.962909');
insert into "blog" ("author", "category_id", "content", "cover", "created_at", "deleted_at", "id", "is_deleted", "title", "updated_at") values ('owner@aim-consultant.id', 'd5306162-4163-4cdf-b142-d79a2a6ff5b3', '<h1>PT Arunika Indo Miratama</h1><p>Konsultan legalitas dan perizinan khusus Pembuatan Pendirian (PT,CV &amp; YAYASAN), SBU Konstruksi, PKP, BPOM, Izin Edar Alkes, SKUP MIGAS, HKI &amp; ABUJAPI farmasi yang berlokasi di Bekasi. Berkomitmen untuk membantu UMKM dalam proses legalitas dan perizinan berusaha di Indonesia, dengan memprioritaskan kemudahan klien untuk mulai dari pengumpulan dokumen yang dibutuhkan hingga penyelesaian alur kerja.</p><h3>VISI</h3><p>1. Menjadi sebuah perubahan yang dapat terus membantu jalan nya usaha dari setiap kalangan</p><p>2. Menjadi perusahaan yang profesional dan berintegritas tinggi</p><p>3. Menjadi satu satunya consultant yang paling bermanfaat untuk banyak kalangan pebisnis</p><h3>MISI</h3><p>1. Meningkatkan kualitas</p><p>2. Meningkatkan usaha di Indonesia menjadi nomor 1</p><p>3. Membantu UMKM &amp; Menengah</p><p>4. Melaksanakan tugas dengan profesional</p>', 'company-logo.png', '2024-12-26 06:21:17.965923', NULL, '16a298aa-23e7-4c31-8c6c-adc7e61bf745', 0, 'AIM Consultant', '2024-12-26 06:21:17.965923');

insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'uploads/2024-12-24-2480289.png', 0, 'pendirian pt perorangan + vo', 4000000, '2024-12-24 20:44:28.839144');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'uploads/2024-12-24-248049900.png', 0, 'pendirian pt', 5500000, '2024-12-24 20:51:49.117466');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'uploads/2024-12-24-248030900.png', 0, 'pendirian pt + vo', 7500000, '2024-12-24 20:52:30.925694');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '99811e2d-0053-4787-bd9a-740f679be20f', 'uploads/2024-12-24-248044900.png', 0, 'pendirian cv', 3500000, '2024-12-24 20:53:44.762441');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'uploads/2024-12-24-248053900.png', 0, 'pendirian cv + vo', 5500000, '2024-12-24 20:53:53.281207');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '96edd2bd-9429-4463-9f77-07747b92ad49', 'uploads/2024-12-24-248017900.png', 0, 'pendirian yayasan', 7500000, '2024-12-24 20:54:17.979327');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '0df4c122-cb4d-448f-a277-3e1ab1b11a55', 'uploads/2024-12-24-248042900.png', 0, 'sbu konstruksi kecil', 0, '2024-12-24 20:54:42.42238');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '8d4208e5-1910-4711-9e15-e7d0920a72fe', 'uploads/2024-12-24-248057900.png', 0, 'sbu konstruksi menengah', 0, '2024-12-24 20:54:57.251079');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '8f48fc79-09bf-4897-8f21-e3acdf3b1f6b', 'uploads/2024-12-24-248015900.png', 0, 'pkp (pengukuhan pengusaha kena pajak)', 4500000, '2024-12-24 20:55:15.941418');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'uploads/2024-12-24-248040900.png', 0, 'bpom makanan produksi sendiri', 0, '2024-12-24 20:55:40.110153');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'uploads/2024-12-24-248048900.png', 0, 'bpom makanan import', 0, '2024-12-24 20:55:48.631563');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'uploads/2024-12-24-248008900.png', 0, 'bpom kosmetik produksi sendiri', 0, '2024-12-24 20:56:08.922736');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '365631c1-e9da-4c00-9b81-12aec55591ad', 'uploads/2024-12-24-248031900.png', 0, 'bpom kosmetik import', 0, '2024-12-24 20:56:31.610126');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'uploads/2024-12-24-248051900.png', 0, 'bpom suplemen produksi sendiri', 0, '2024-12-24 20:56:51.630209');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'uploads/2024-12-24-248001900.png', 0, 'bpom suplemen import', 0, '2024-12-24 20:57:01.483824');
insert into "public"."service" ("created_at", "deleted_at", "description", "id", "image", "is_deleted", "name", "price", "updated_at") values ('2024-12-24 13:12:16.650389', NULL, NULL, 'cc0f958c-4177-469e-84e8-7ba4d4c8a299', 'uploads/2024-12-24-248008900.png', 0, 'pengurusan jasa pengamanan security', 0, '2024-12-24 20:57:08.360222');

insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:48.632184', NULL, '13741afa-e8a7-4213-a290-204dbd6df462', 0, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'asistensi evaluasi', '2024-12-24 20:55:48.632184');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:48.632184', NULL, '6c3aff01-108d-41a0-9de7-14408df1bc0e', 0, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'asistensi teknis', '2024-12-24 20:55:48.632184');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:48.632184', NULL, 'bf88a9a9-cc54-4c22-9366-4765e0f81cb3', 0, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'penyusunan sop', '2024-12-24 20:55:48.632184');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:48.632184', NULL, '62eb133c-5a49-4307-9ce7-77c406fca8a3', 0, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'registrasi head akun rba', '2024-12-24 20:55:48.632184');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:48.632184', NULL, '03911721-1c5d-4d42-b50a-ef541bf3b1f8', 0, 'ae6b955f-ed8a-436d-a527-7f3f69548e93', 'izin edar md', '2024-12-24 20:55:48.632184');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '4b464d96-0a3a-48c8-a148-e1c4fcfeb94d', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'persetujuan denah', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, 'dab09a40-e72b-407c-89b4-e474de640f87', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'cpkb', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '04503ce2-be6d-4e4a-82db-9cbd1cbd1912', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'asistensi teknis', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '19adb250-c611-404c-b0ec-65e2ba57ba6d', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'penyusunan sop', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '3a2459bc-a877-49a6-a706-04ad2e8a3cde', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'penyusunan dokumen', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '46a88aec-be70-486e-9671-8003ba6c0141', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'registrasi head akun notifkos', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '6ed53601-6330-492c-b009-680e9800244f', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'registrasi sub acount', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:08.92464', NULL, '49a1dda6-8c02-4e18-8bf6-db286d234d9a', 0, '13273bf9-79c9-4d77-9487-46f065bf9c63', 'izin edar notifikasi kosmetik', '2024-12-24 20:56:08.92464');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, '85825400-71ad-4707-afce-c44e7f384e52', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'rekomendasi sebagai pemohon notifikasi', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, 'f0a37980-c062-4b00-94ab-b60e0f1607e7', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'asistensi teknis', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, 'e26303f5-91ff-4faf-af65-b682fb445e8b', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'penyusunan sop', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, 'f9ec2c84-66f1-4036-b6cc-e067d22d0a16', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'penyusunan dokumen', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, '75aad268-0486-40f1-b862-efde7186e69f', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'registrasi head akun notifkos', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, '2159d098-f2fd-41f4-b264-e55a5b7d3609', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'registrasi sub acount', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:31.611167', NULL, '0af1424c-4b16-4927-87cc-f024738acd1b', 0, '365631c1-e9da-4c00-9b81-12aec55591ad', 'izin edar notifikasi kosmetik', '2024-12-24 20:56:31.611167');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '87c91116-4959-4acf-90d9-7cbfe5076b05', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'cppob', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, 'c04e3ccf-bf3a-4433-93cf-a4d7ef949951', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'asistensi teknis', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '0ec97c8a-6eea-4e71-9241-76225c5a3c48', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'penyusunan sop', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '7cd00ccd-2ead-41f5-b406-904eb6f556b1', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'penyusunan dokumen', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '81c97f62-c93e-4ef1-94e8-617439acb9ed', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'registrasi head akun notifkos', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '33383bc0-e1e6-4b78-9bb9-c4fa334690f5', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'pra registrasi', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:56:51.63264', NULL, '0b40282c-c6dc-483a-a800-0b58c74ad1df', 0, '18f7908e-5d8b-4e17-9de1-1e74fafa182b', 'izin edar tr', '2024-12-24 20:56:51.63264');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, '556c0194-4a17-42c8-80bb-1910490fcd7c', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'cppob', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, '8e245fee-712c-44f5-bedc-61c55d5a2e8d', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'asistensi teknis', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, '4e2a97a9-8cb8-4b5a-9cf0-d0af8ebd3a21', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'penyusunan sop', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, '92f0f425-18a1-495f-bbd7-64ef478fbbc7', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'penyusunan dokumen', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, 'fc57f372-6ff5-44e8-b05b-da328281dca7', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'registrasi head akun notifkos', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, 'ce4f6191-6cd9-4104-bf49-31e105622cc1', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'pra registrasi', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:01.485792', NULL, 'ecdc1016-706d-4d7e-898e-294e3a1bcc82', 0, 'c5370c21-f223-44ea-848d-703805b0d7f4', 'izin edar tr', '2024-12-24 20:57:01.485792');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:08.361547', NULL, 'a4292389-9913-4430-9ca6-6971a117b2bd', 0, 'cc0f958c-4177-469e-84e8-7ba4d4c8a299', 'kta abujapi', '2024-12-24 20:57:08.361547');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:08.361547', NULL, 'e674bfee-3eb1-4ff9-9f4f-b203d1c2067d', 0, 'cc0f958c-4177-469e-84e8-7ba4d4c8a299', 'pelatihan gada utama', '2024-12-24 20:57:08.361547');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:08.361547', NULL, '69f09b0a-6dba-48dc-9be3-d4bc9419130f', 0, 'cc0f958c-4177-469e-84e8-7ba4d4c8a299', 'rekomendasi polda', '2024-12-24 20:57:08.361547');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:57:08.361547', NULL, '71dea8ef-d5fa-471e-9278-1cc5be067348', 0, 'cc0f958c-4177-469e-84e8-7ba4d4c8a299', 'sio mabes polri / bkpm', '2024-12-24 20:57:08.361547');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, '3ba9cfa1-61a4-4e47-a68e-dbbc357be528', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'cek nama perusahaan', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, '686460ea-b021-4008-a90d-b4234ce8b2c3', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'akta pendirian', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, 'bb3acfe4-917d-44a6-b48d-462477bae916', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'sk kementrian hukum dan ham ri', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, 'b1f5eb12-e994-476c-88b4-fd15270dbb21', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'npwp perusahaan', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, 'e562fa07-b5ec-4c6e-b05b-b5ea7f3be38f', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'skt perusahaan dari kantor pajak', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, 'd9001845-3f80-482f-a2a3-90be3ce2c8e2', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'nib (oss rba) dengan 10 kbli', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:43:39.010536', NULL, 'bf3f8fe8-ecd3-4c07-86d7-879eba838a1a', 0, '2f339787-bcf5-4dc7-a06a-f0f16b80878d', 'efin perusahaan', '2024-12-24 20:43:39.010536');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, 'f4e3d7bc-9d7a-4c50-823b-dada1b8ff7b9', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'cek nama perusahaan', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, 'ccdeef1f-e281-4111-8b84-81d547813597', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'akta pendirian', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '68fdf332-7e82-486c-a1a5-3f8c157e585b', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'sk kementrian hukum dan ham ri', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '721dabfa-58ed-4868-8559-34fa0a24373e', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'npwp perusahaan', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '8b99d96f-4068-4579-904f-bf7b20d41d2c', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'skt perusahaan dari kantor pajak', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '000e9ea5-5838-48db-a042-37d66c93d64a', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'nib (oss rba) dengan 10 kbli', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '6a85647b-1e5c-4ec6-a52c-b4eee220b656', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'efin perusahaan', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, 'c1723f8b-1d28-41ce-a604-37e9f4622163', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'ruang meting 60 jam setahun', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:44:28.840295', NULL, '0b0858e9-d3bf-48be-bd84-4453a5b63169', 0, 'ff6aeed1-6f54-44d0-a590-332ba4313961', 'handling surat menyurat', '2024-12-24 20:44:28.840295');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, 'da3f6e58-e0a0-4c0a-b784-e0f36d0d2756', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'cek nama perusahaan', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, 'a0e9bd94-cf13-4b12-8ab1-fcfd4c8d3e99', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'akta pendirian', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, '6e712097-41b2-42ec-ac14-39a7863f0ba4', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'sk kementrian hukum dan ham ri', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, '0d2742f5-5e85-49ca-8182-2d308694f34f', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'npwp perusahaan', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, '9f51d1e5-c936-4e68-93b2-a8a77b4c0249', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'skt perusahaan dari kantor pajak', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, '18745669-b039-4d90-90f4-3d0bf3935f96', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'nib (oss rba) dengan 15 kbli', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, 'b3613829-4c73-448a-a728-41d50255e3e6', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'efin perusahaan', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:51:49.120987', NULL, 'c8a1c5df-d863-409d-bec8-30a5ade2db0f', 0, 'c1b9ebeb-4175-498d-8f98-c515a58c3a91', 'sertifikat standar', '2024-12-24 20:51:49.120987');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '099b2925-b2c5-4faf-b310-1f4e74a65beb', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'cek nama perusahaan', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '1add3d8c-5710-49b2-add3-2518a4433a0d', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'akta pendirian', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '6e6faf69-7265-4708-b14a-9cf20ed9e7cb', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'sk kementrian hukum dan ham ri', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, 'f8af59af-be0c-4437-8be6-dab8362f777d', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'npwp perusahaan', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '77d277c6-054f-4ff9-b853-d840e15a4735', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'skt perusahaan dari kantor pajak', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, 'f19f9958-7deb-4ad4-bbc0-1c2cbfce37da', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'nib (oss rba) dengan 15 kbli', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '157b3107-f220-453c-ada8-571f51bceb9c', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'efin perusahaan', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '36c4ed6f-5fd6-4e9c-bda0-a4a113a9c73f', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'sertifikat standar', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, '554ddc41-e301-4ea2-a940-b2cc3a766ede', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'ruang meting 60 jam setahun', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:52:30.927994', NULL, 'be2d1ab0-cb9a-4413-b68b-d24ac13d6ea3', 0, '248d9d58-3a19-4c6b-857b-ff8e39ad7f23', 'handling surat menyurat', '2024-12-24 20:52:30.927994');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, 'f380f2bd-116a-4143-9c9d-bc46f671003a', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'cek nama perusahaan', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, 'f4768de0-7b9d-4241-ad03-b3381c3cf70e', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'akta pendirian', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, '96ae6ff0-48de-4377-aec9-276e97f2645b', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'sk kementrian hukum dan ham ri', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, '5b759170-4893-4c8a-b863-d16ca68029a8', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'npwp perusahaan', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, '81eec67e-6404-4479-8c7e-73ec5aa9c45f', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'skt perusahaan dari kantor pajak', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, '59d5e445-63ed-4d39-9f03-d5a9552090f4', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'nib (oss rba) dengan 10 kbli', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, '17270cf9-2360-47a6-90b8-4b14db47e7fe', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'efin perusahaan', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:44.763799', NULL, 'f39361d1-4fdd-4e59-b01f-6c0afdc9d4a3', 0, '99811e2d-0053-4787-bd9a-740f679be20f', 'sertifikat standar', '2024-12-24 20:53:44.763799');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, 'a5c8b66f-3fee-440c-abea-2965dad45eb7', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'cek nama perusahaan', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '832491df-4322-44f1-803a-3134006e4304', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'akta pendirian', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '1a3adc85-785e-41f9-b763-08c9cf5f9843', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'sk kementrian hukum dan ham ri', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '16e52b96-c336-4846-ae32-737b631d066f', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'npwp perusahaan', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '81065fa9-5589-4547-b4c2-f58e8bdb48be', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'skt perusahaan dari kantor pajak', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '6c36f9f3-f5cb-45da-b7c1-081aa891d1ca', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'nib (oss rba) dengan 10 kbli', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, 'fbda86a0-e83e-4584-bf74-3fd2b3a71511', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'efin perusahaan', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, 'f28627a1-99da-4014-8a9c-5f499f27f5ec', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'sertifikat standar', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '42abd25a-ad7f-4eb8-b177-96515fd9d3da', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'ruang meting 60 jam setahun', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:53:53.282633', NULL, '06c5dfa5-19e3-460f-8078-7c32d09f97ec', 0, '4301a562-57c9-4a8a-a724-13014cd6bf8b', 'handling surat menyurat', '2024-12-24 20:53:53.282633');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '0b7706df-afd1-47d2-ad51-33de333d3b85', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'cek nama perusahaan', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '167ebf9e-6cf3-41a5-8018-bcf72a08bd42', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'akta pendirian dengan 10 kbli', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '58040da6-cbbd-4018-be7e-526a006ba982', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'sk kementrian hukum dan ham ri', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '5b8de10a-f9e7-48e8-85f3-ffa0f56c2073', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'npwp perusahaan', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '9af84fdc-13cd-4600-82ed-e3480f433b7d', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'skt perusahaan dari kantor pajak', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:17.981644', NULL, '49aa15b2-ed5c-4c2d-ab94-596b6b9f5ab6', 0, '96edd2bd-9429-4463-9f77-07747b92ad49', 'nib (oss rba)', '2024-12-24 20:54:17.981644');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:42.4248', NULL, 'b5066810-327a-4159-afd4-63e5df517431', 0, '0df4c122-cb4d-448f-a277-3e1ab1b11a55', 'kta ( kartu tanda anggota )', '2024-12-24 20:54:42.4248');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:42.4248', NULL, '7f947c52-ba73-4860-bdeb-570983ef13e6', 0, '0df4c122-cb4d-448f-a277-3e1ab1b11a55', 'sbu', '2024-12-24 20:54:42.4248');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:42.4248', NULL, '690cab0a-2c82-4568-a510-7d8b9754204c', 0, '0df4c122-cb4d-448f-a277-3e1ab1b11a55', 'skk tenaga ahli', '2024-12-24 20:54:42.4248');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:42.4248', NULL, 'dc84a6b2-c15e-428c-a369-4d638318b9d2', 0, '0df4c122-cb4d-448f-a277-3e1ab1b11a55', 'skk penanggung jawab subklasifikasi', '2024-12-24 20:54:42.4248');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:57.253466', NULL, 'b28d9fae-59e7-4ebe-a242-bf49e4618163', 0, '8d4208e5-1910-4711-9e15-e7d0920a72fe', 'kta ( kartu tanda anggota )', '2024-12-24 20:54:57.253466');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:57.253466', NULL, '9c607871-8807-4181-83ff-3a86135fe0d6', 0, '8d4208e5-1910-4711-9e15-e7d0920a72fe', 'sbu', '2024-12-24 20:54:57.253466');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:57.253466', NULL, 'fcbecaf9-fccd-4a9d-977c-63152592100b', 0, '8d4208e5-1910-4711-9e15-e7d0920a72fe', 'skk tenaga ahli', '2024-12-24 20:54:57.253466');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:54:57.253466', NULL, '689f115e-a6ea-434c-b95d-b6d545ffc757', 0, '8d4208e5-1910-4711-9e15-e7d0920a72fe', 'skk penanggung jawab subklasifikasi', '2024-12-24 20:54:57.253466');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:15.943757', NULL, '9e5244e0-ef97-4206-b999-4f6a61f3a907', 0, '8f48fc79-09bf-4897-8f21-e3acdf3b1f6b', 'spkp (surat pengukuhan pengusaha kena pajak)', '2024-12-24 20:55:15.943757');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:15.943757', NULL, 'b935dc7e-2dc5-4306-8052-e21df5a5b3ca', 0, '8f48fc79-09bf-4897-8f21-e3acdf3b1f6b', 'aktivasi pengusaha kena pajak', '2024-12-24 20:55:15.943757');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:15.943757', NULL, 'c5067ee6-a56b-41b0-b853-f686a114c207', 0, '8f48fc79-09bf-4897-8f21-e3acdf3b1f6b', 'sertifikat elektronik', '2024-12-24 20:55:15.943757');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, '6cea6002-ccbc-4b38-9035-739495d084be', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'cppob', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, '637e7e6f-9e6a-493d-9ebc-1d6cae47e85e', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'asistensi evaluasi', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, 'a728c9e2-d1e2-47d4-8105-5cf159604917', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'asistensi teknis', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, 'd045c67f-9361-44d2-a124-5ae6cea703ec', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'penyusunan sop', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, '5e6ae1e0-3584-4d2d-ba69-08c8ef75161d', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'penyusunan dokumen', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, 'a7d5975e-1511-4242-8722-f2a673c22b39', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'registrasi head akun rba', '2024-12-24 20:55:40.111531');
insert into "public"."service_term" ("created_at", "deleted_at", "id", "is_deleted", "service_id", "term_name", "updated_at") values ('2024-12-24 20:55:40.111531', NULL, 'e0b419cd-ee25-49f3-bfeb-b781ff323ac6', 0, 'ee808adb-8d4a-4814-8095-9a708ef32c6e', 'izin edar md', '2024-12-24 20:55:40.111531');


insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:28.073004', '2024-12-24 20:47:10.913417', '423df058-9e48-4120-806d-97c378603f25', 'uploads/2024-12-24-248003900.jpg', 1, '', '2024-12-24 20:47:10.915141');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:45.884718', '2024-12-24 20:47:16.459347', 'e45311e6-afa6-45db-8290-0db4f388d104', 'uploads/2024-12-24-2480459.jpg', 1, '', '2024-12-24 20:47:16.460874');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:07.009857', '2024-12-24 20:47:21.082879', 'f6c16e13-96f0-48b8-bfbf-f5e87e4ed51c', 'uploads/2024-12-24-2480079.jpg', 1, '', '2024-12-24 20:47:21.08363');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:26.915282', '2024-12-24 20:47:49.339263', 'c7750e50-e2e6-494a-8426-2727b8b1c244', 'uploads/2024-12-24-2480269.jpg', 1, '', '2024-12-24 20:47:49.339927');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:30.159575', '2024-12-24 20:47:51.315455', 'd3af31ba-cb68-4a36-b1fc-fac17c89fea7', 'uploads/2024-12-24-2480309.jpg', 1, '', '2024-12-24 20:47:51.317052');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:33.617165', '2024-12-24 20:47:53.287096', '85493415-dcee-4204-9ee8-1f98b95598ce', 'uploads/2024-12-24-2480339.jpeg', 1, '', '2024-12-24 20:47:53.288229');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:36.858319', '2024-12-24 20:47:55.17161', 'dadc2ef6-e0df-40e8-8bea-dafa403544f9', 'uploads/2024-12-24-2480369.png', 1, '', '2024-12-24 20:47:55.173167');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:41.768758', '2024-12-24 20:47:56.970164', 'd725a3c2-6d0b-451c-a01b-900536f8ea59', 'uploads/2024-12-24-2480419.png', 1, '', '2024-12-24 20:47:56.97087');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:34:39.458844', '2024-12-24 20:47:59.314438', 'cc1ff5c0-7027-471f-80c9-e03f36d63620', 'uploads/2024-12-24-2480399.png', 1, '', '2024-12-24 20:47:59.315826');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:34:49.697873', '2024-12-24 20:48:01.108529', '36dda079-bfc7-4a4b-bb96-83f39763a5dc', 'uploads/2024-12-24-2480499.png', 1, '', '2024-12-24 20:48:01.109624');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:34:57.638144', '2024-12-24 20:48:03.822165', 'd8c52152-f1ec-4602-9150-032f474ce68b', 'uploads/2024-12-24-2480579.jpg', 1, '', '2024-12-24 20:48:03.823705');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:17.784919', '2024-12-24 20:48:05.66634', 'cc98adfd-32a7-4cf9-9d8d-817d5c9b01fb', 'uploads/2024-12-24-2480179.jpeg', 1, '', '2024-12-24 20:48:05.667439');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:23.833251', '2024-12-24 20:48:07.640905', '4e4bc1ee-0f68-4911-aa3f-207ae9ef1a99', 'uploads/2024-12-24-2480239.png', 1, '', '2024-12-24 20:48:07.642039');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:34.310186', '2024-12-24 20:48:09.589247', '47c7f676-795a-4857-b0e6-39ae090dd227', 'uploads/2024-12-24-2480349.png', 1, '', '2024-12-24 20:48:09.590996');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:35:39.8657', '2024-12-24 20:48:11.590565', 'ccbc3dcd-5850-402d-b221-535e5cd6ea85', 'uploads/2024-12-24-2480399.jpg', 1, '', '2024-12-24 20:48:11.591383');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:33:22.121919', '2024-12-24 20:48:13.44633', '3a391575-3941-4cbe-bc25-bc97de9cdb60', 'uploads/2024-12-24-248050900.jpg', 1, '', '2024-12-24 20:48:13.448275');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:48:17.192108', NULL, '3bfac110-3039-4919-8d1d-4a8499a082c8', 'uploads/2024-12-24-248017900.jpg', 0, '', '2024-12-24 20:48:17.192108');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:48:20.115481', NULL, '3a7507ee-eb59-4c34-a9e2-c6152c26e061', 'uploads/2024-12-24-248020900.jpg', 0, '', '2024-12-24 20:48:20.115481');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:48:23.221876', NULL, '218e85a1-3b54-43a7-9c56-9c8a89514587', 'uploads/2024-12-24-248023900.jpg', 0, '', '2024-12-24 20:48:23.221876');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:49:37.234951', NULL, 'b9dd93bb-677f-4259-9b4c-2950f5685266', 'uploads/2024-12-24-248037900.jpeg', 0, '', '2024-12-24 20:49:37.234951');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:49:44.093433', NULL, 'df2f6cc4-ffb8-4633-a89f-cc3fb7c85a86', 'uploads/2024-12-24-248044900.jpeg', 0, '', '2024-12-24 20:49:44.093433');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:49:50.7139', NULL, '6d19b08f-d46b-4bdd-a616-7501c0147de3', 'uploads/2024-12-24-248050900.png', 0, '', '2024-12-24 20:49:50.7139');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:02.564242', NULL, 'b11b4b7f-7840-480f-95d4-021fc4083c65', 'uploads/2024-12-24-248002900.jpg', 0, '', '2024-12-24 20:50:02.564242');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:07.664261', NULL, '6edab7bf-2235-4992-9b79-780d2c1c4134', 'uploads/2024-12-24-248007900.png', 0, '', '2024-12-24 20:50:07.664261');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:11.901306', NULL, '225810b9-fd57-4a25-abca-d5bd74f095a4', 'uploads/2024-12-24-248011900.png', 0, '', '2024-12-24 20:50:11.901306');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:32.397577', NULL, '5f8787c7-2a80-42ba-a728-bcab17489a48', 'uploads/2024-12-24-248032900.jpg', 0, '', '2024-12-24 20:50:32.397577');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:36.971254', NULL, '4a653528-93c0-4010-9695-3421c7dbc77b', 'uploads/2024-12-24-248036900.jpg', 0, '', '2024-12-24 20:50:36.971254');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:43.350532', NULL, 'caf17432-5f24-446c-83e4-2f49e268bb04', 'uploads/2024-12-24-248043900.jpeg', 0, '', '2024-12-24 20:50:43.350532');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:47.188578', NULL, '136cde59-f0f2-418d-a6e4-2bcfa3be9951', 'uploads/2024-12-24-248047900.png', 0, '', '2024-12-24 20:50:47.188578');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:54.313682', NULL, 'e5c091ed-1c43-42a6-8b06-2f6112e60bb8', 'uploads/2024-12-24-248054900.png', 0, '', '2024-12-24 20:50:54.313682');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:57.402336', NULL, 'f4f58e40-d8aa-42dc-ae77-b636a654c045', 'uploads/2024-12-24-248057900.jpg', 0, '', '2024-12-24 20:50:57.402336');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:49:40.68079', '2024-12-24 20:58:59.65908', '5f3fc3fd-8108-4118-a53c-2c26994e7666', 'uploads/2024-12-24-248040900.png', 1, '', '2024-12-24 20:58:59.660055');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 20:50:51.08523', '2024-12-24 20:59:03.591012', 'b86e6906-9aa6-423d-a1bd-a435ac72d37b', 'uploads/2024-12-24-248051900.png', 1, '', '2024-12-24 20:59:03.592239');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 21:00:28.411347', NULL, 'e8c588d3-f53f-4c38-8987-d3cba912658f', 'uploads/2024-12-24-249028900.png', 0, '', '2024-12-24 21:00:28.411347');
insert into "public"."client_logo" ("created_at", "deleted_at", "id", "image", "is_deleted", "name", "updated_at") values ('2024-12-24 21:00:50.735643', NULL, '4e523d4a-b200-4460-b8d5-928429ae4740', 'uploads/2024-12-24-249050900.png', 0, '', '2024-12-24 21:00:50.735643');

insert into "banner" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:24:00.327576', NULL, '17f426db-7756-45e8-82f1-2d3cf10e13ca', 'uploads/2024-12-24-2480009.png', 0, '2024-12-24 20:24:00.327576');
insert into "banner" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:24:03.795792', NULL, 'ed43f708-84eb-4076-aec6-2cd8f9fa6210', 'uploads/2024-12-24-2480039.png', 0, '2024-12-24 20:24:03.795792');
insert into "banner" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:23:50.14556', NULL, '6cbe4bb5-21de-43b7-9d84-522da13e5baa', 'uploads/2024-12-24-2480509.png', 1, '2024-12-24 20:44:53.832403');
insert into "banner" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:45:20.141611', NULL, 'db3b3422-5496-497c-9473-89dcaef893b0', 'uploads/2024-12-24-2480209.png', 0, '2024-12-24 20:45:20.141611');
insert into "banner" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-26 06:14:44.642879', NULL, 'd56aecef-0a47-423f-85f7-e7b73a1bca0e', 'uploads/2024-12-26-266044900.png', 0, '2024-12-26 06:14:44.642879');

insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:07.625667', '2024-12-24 20:36:10.856575', 'a9eac18b-c0ec-4d70-a619-d63e10fc234c', 'uploads/2024-12-24-2480079.jpg', 1, '2024-12-24 20:36:10.858763');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:19.699413', NULL, 'a38a0d2c-daa3-420a-b4e7-05fdbcbf7c8b', 'uploads/2024-12-24-2480199.jpg', 0, '2024-12-24 20:36:19.699413');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:23.139534', NULL, '9165afe2-bdcd-4d06-83b0-af231423845c', 'uploads/2024-12-24-2480239.jpg', 0, '2024-12-24 20:36:23.139534');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:28.413939', NULL, 'd226d186-ba3f-41b9-8638-2e21581611dd', 'uploads/2024-12-24-2480289.jpg', 0, '2024-12-24 20:36:28.413939');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:32.985448', NULL, '8bbd7f9a-bc11-440e-9327-b9952f6c213d', 'uploads/2024-12-24-2480329.jpg', 0, '2024-12-24 20:36:32.985448');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:38.275051', NULL, '8ab78953-e483-4746-ba3a-1fe983c0367c', 'uploads/2024-12-24-2480389.jpg', 0, '2024-12-24 20:36:38.275051');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:44.72145', NULL, 'd05ef11c-b9ea-4d19-860c-fd79fb57e571', 'uploads/2024-12-24-2480449.jpg', 0, '2024-12-24 20:36:44.72145');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:53.960789', NULL, 'd8c30708-2c0b-44f9-9eff-6736825d4e84', 'uploads/2024-12-24-2480539.jpg', 0, '2024-12-24 20:36:53.960789');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:37:02.473094', NULL, 'add4bf79-6975-4988-b878-cf057ecbb17e', 'uploads/2024-12-24-2480029.jpg', 0, '2024-12-24 20:37:02.473094');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:37:09.62453', NULL, 'b9db636b-acbc-4c62-a8fc-33f472f57167', 'uploads/2024-12-24-2480099.jpg', 0, '2024-12-24 20:37:09.62453');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:37:17.539657', NULL, '07ea683c-0a17-4601-8b31-d6cc2a92478c', 'uploads/2024-12-24-2480179.jpg', 0, '2024-12-24 20:37:17.539657');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:37:23.895056', '2024-12-24 20:37:31.056453', '62b99d64-3045-47d5-9cf6-b863e930958c', 'uploads/2024-12-24-2480239.jpg', 1, '2024-12-24 20:37:31.057889');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:37:38.680925', '2024-12-24 20:37:42.8925', '4d02a079-acd0-47a7-bc96-8d1e7158bea5', 'uploads/2024-12-24-2480389.jpg', 1, '2024-12-24 20:37:42.894066');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:38:07.780149', NULL, 'd023b675-1151-4a72-9ead-8ac7ba83ce1e', 'uploads/2024-12-24-2480079.jpg', 0, '2024-12-24 20:38:07.780149');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:38:22.83686', NULL, 'c7f4afbf-2867-4d3f-a384-049f5ceb04bb', 'uploads/2024-12-24-2480229.jpg', 0, '2024-12-24 20:38:22.83686');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:38:35.635212', NULL, '32dff5c7-8458-4b17-8307-7381965b097d', 'uploads/2024-12-24-2480459.jpg', 0, '2024-12-24 20:38:45.414019');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:38:52.908106', NULL, '6810c323-1bb1-48d4-9252-3b70ceb33dcb', 'uploads/2024-12-24-2480529.jpg', 0, '2024-12-24 20:38:52.908106');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:38:58.507463', NULL, '5a1c06f2-d99e-4b5d-bc1c-c93b8acb4d94', 'uploads/2024-12-24-2480589.jpg', 0, '2024-12-24 20:38:58.507463');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:39:09.835337', '2024-12-24 20:39:16.031703', '44d2e0ad-bee8-4459-8fe3-e8b4da7cd53d', 'uploads/2024-12-24-2480099.jpg', 1, '2024-12-24 20:39:16.033825');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:39:25.305497', NULL, '7aa1df5c-74d0-4787-b508-c64b5d0d3ee7', 'uploads/2024-12-24-2480259.jpg', 0, '2024-12-24 20:39:25.305497');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:39:35.112519', '2024-12-24 20:39:38.999643', '5e76c832-c2dd-4f72-91aa-c2335eb2b359', 'uploads/2024-12-24-2480359.jpg', 1, '2024-12-24 20:39:39.001147');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:39:48.58536', NULL, 'd7a1ca0c-dd45-4053-9707-af03e63bf616', 'uploads/2024-12-24-2480489.jpg', 0, '2024-12-24 20:39:48.58536');
insert into "public"."gallery" ("created_at", "deleted_at", "id", "image", "is_deleted", "updated_at") values ('2024-12-24 20:36:15.708167', '2024-12-24 20:39:56.725096', '0e5e0301-4a8b-423a-b227-0f9816889013', 'uploads/2024-12-24-2480159.jpg', 1, '2024-12-24 20:39:56.726292');
