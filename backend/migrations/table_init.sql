DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS service_term;
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS "references";
DROP TABLE IF EXISTS banner;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS client_logo;

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

INSERT INTO service (
	name, price, description, image
)
VALUES
(LOWER('PENDIRIAN PT PERORANGAN'), 1500000, NULL,'default.png'),
(LOWER('PENDIRIAN PT PERORANGAN + VO'), 4000000, NULL,'default.png'),
(LOWER('PENDIRIAN PT'), 5500000, NULL,'default.png'),
(LOWER('PENDIRIAN PT + VO'), 7500000, NULL,'default.png'),
(LOWER('PENDIRIAN CV'), 3500000, NULL,'default.png'),
(LOWER('PENDIRIAN CV + VO'), 5500000, NULL,'default.png'),
(LOWER('PENDIRIAN YAYASAN'), 7500000, NULL,'default.png'),
(LOWER('SBU KONSTRUKSI KECIL'), 0, NULL,'default.png'),
(LOWER('SBU KONSTRUKSI MENENGAH'), 0, NULL,'default.png'),
(LOWER('PKP (PENGUKUHAN PENGUSAHA KENA PAJAK)'), 4500000, NULL,'default.png'),
(LOWER('BPOM MAKANAN PRODUKSI SENDIRI'), 0, NULL,'default.png'),
(LOWER('BPOM MAKANAN IMPORT'), 0, NULL,'default.png'),
(LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'), 0, NULL,'default.png'),
(LOWER('BPOM KOSMETIK IMPORT'), 0, NULL,'default.png'),
(LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'), 0, NULL,'default.png'),
(LOWER('BPOM SUPLEMEN IMPORT'), 0, NULL,'default.png'),
(LOWER('PENGURUSAN JASA PENGAMANAN SECURITY'), 0, NULL,'default.png');


INSERT INTO service_term(
	term_name, service_id
)
VALUES
(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('NIB (OSS RBA) dengan 10 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('NIB (OSS RBA) dengan 10 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('Ruang meting 60 Jam Setahun'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),
(LOWER('Handling surat menyurat'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT PERORANGAN + VO'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('NIB (OSS RBA) dengan 15 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),
(LOWER('Sertifikat Standar'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('NIB (OSS RBA) dengan 15 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Sertifikat Standar'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Ruang meting 60 Jam Setahun'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),
(LOWER('Handling surat menyurat'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN PT + VO'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('NIB (OSS RBA) dengan 10 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),
(LOWER('Sertifikat Standar'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Akta Pendirian'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('NIB (OSS RBA) dengan 10 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Efin Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Sertifikat Standar'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Ruang meting 60 Jam Setahun'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),
(LOWER('Handling surat menyurat'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN CV + VO'))),

(LOWER('Cek Nama Perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),
(LOWER('Akta Pendirian Dengan 10 KBLI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),
(LOWER('SK Kementrian Hukum dan HAM RI'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),
(LOWER('Npwp perusahaan'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),
(LOWER('SKT Perusahaan dari Kantor Pajak'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),
(LOWER('NIB (OSS RBA)'), (SELECT id FROM service WHERE name = LOWER('PENDIRIAN YAYASAN'))),

(LOWER('KTA ( Kartu Tanda Anggota )'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI KECIL'))),
(LOWER('SBU'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI KECIL'))),
(LOWER('SKK Tenaga Ahli'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI KECIL'))),
(LOWER('SKK Penanggung Jawab Subklasifikasi'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI KECIL'))),

(LOWER('KTA ( Kartu Tanda Anggota )'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI MENENGAH'))),
(LOWER('SBU'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI MENENGAH'))),
(LOWER('SKK Tenaga Ahli'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI MENENGAH'))),
(LOWER('SKK Penanggung Jawab Subklasifikasi'), (SELECT id FROM service WHERE name = LOWER('SBU KONSTRUKSI MENENGAH'))),

(LOWER('SPKP (surat pengukuhan pengusaha kena pajak)'), (SELECT id FROM service WHERE name = LOWER('PKP (PENGUKUHAN PENGUSAHA KENA PAJAK)'))),
(LOWER('Aktivasi pengusaha kena pajak'), (SELECT id FROM service WHERE name = LOWER('PKP (PENGUKUHAN PENGUSAHA KENA PAJAK)'))),
(LOWER('Sertifikat elektronik'), (SELECT id FROM service WHERE name = LOWER('PKP (PENGUKUHAN PENGUSAHA KENA PAJAK)'))),

(LOWER('CPPOB'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('Asistensi Evaluasi'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('Penyusunan Dokumen'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('Registrasi Head Akun RBA'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),
(LOWER('IZin Edar MD'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN PRODUKSI SENDIRI'))),

(LOWER('SMKPO'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),
(LOWER('Asistensi Evaluasi'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),
(LOWER('Registrasi Head Akun RBA'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),
(LOWER('IZin Edar MD'), (SELECT id FROM service WHERE name = LOWER('BPOM MAKANAN IMPORT'))),

(LOWER('Persetujuan Denah'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('CPKB'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('Penyusunan DOkumen'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('Registrasi Head Akun Notifkos'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('Registrasi Sub Acount'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),
(LOWER('IZin Edar Notifikasi Kosmetik'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK PRODUKSI SENDIRI'))),

(LOWER('Rekomendasi Sebagai Pemohon Notifikasi'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('Penyusunan DOkumen'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('Registrasi Head Akun Notifkos'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('Registrasi Sub Acount'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),
(LOWER('IZin Edar Notifikasi Kosmetik'), (SELECT id FROM service WHERE name = LOWER('BPOM KOSMETIK IMPORT'))),

(LOWER('CPPOB'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Penyusunan DOkumen'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Registrasi Head Akun Notifkos'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Pra Registrasi'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),
(LOWER('Izin Edar TR'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN PRODUKSI SENDIRI'))),

(LOWER('CPPOB'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Asistensi Teknis'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Penyusunan SOP'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Penyusunan DOkumen'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Registrasi Head Akun Notifkos'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Pra Registrasi'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),
(LOWER('Izin Edar TR'), (SELECT id FROM service WHERE name = LOWER('BPOM SUPLEMEN IMPORT'))),

(LOWER('KTA Abujapi'), (SELECT id FROM service WHERE name = LOWER('PENGURUSAN JASA PENGAMANAN SECURITY'))),
(LOWER('Pelatihan Gada Utama'), (SELECT id FROM service WHERE name = LOWER('PENGURUSAN JASA PENGAMANAN SECURITY'))),
(LOWER('Rekomendasi Polda'), (SELECT id FROM service WHERE name = LOWER('PENGURUSAN JASA PENGAMANAN SECURITY'))),
(LOWER('SIO Mabes Polri / BKPM'), (SELECT id FROM service WHERE name = LOWER('PENGURUSAN JASA PENGAMANAN SECURITY')))