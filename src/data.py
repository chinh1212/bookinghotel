from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class KhachHang(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    sdt = db.Column(db.String(20), nullable=False)
    diachi = db.Column(db.String(200))
    gmail = db.Column(db.String(100), unique=True)
    subscribeToNewsletter = db.Column(db.Boolean)

class DatPhong(db.Model):
    phong_id = db.Column(db.Integer, primary_key=True)
    kh_id = db.Column(db.Integer, db.ForeignKey('khach_hang.id'), nullable=False)
    checkin = db.Column(db.String(10), nullable=False)
    checkout = db.Column(db.String(10), nullable=False)
    tenphong = db.Column(db.String(50), nullable=False)
    tinhtrang = db.Column(db.String(50), nullable=False)
    songuoi = db.Column(db.Integer)

class HoaDon(db.Model):
    ma_hoadon = db.Column(db.Integer, primary_key=True)
    tenphong = db.Column(db.String(50), nullable=False)
    checkin = db.Column(db.String(10), nullable=False)
    checkout = db.Column(db.String(10), nullable=False)
    tongtien = db.Column(db.Integer, nullable=False)

class Phong(db.Model):
    id_phong = db.Column(db.Integer, primary_key=True)
    tenphong = db.Column(db.String(50), nullable=False)
    tenloaiphong = db.Column(db.String(50), nullable=False)
    tinhtrang = db.Column(db.String(50), nullable=False)
    max = db.Column(db.Integer)
    size = db.Column(db.String(10))
    bed = db.Column(db.String(10))
    view = db.Column(db.String(50))
    mota = db.Column(db.String(200))
    giatien = db.Column(db.Float)
    anh = db.Column(db.String(100))

class OurMenu(db.Model):
    id_menu = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mota = db.Column(db.String(200))
    gia = db.Column(db.String(10), nullable=False)
    imgUrl = db.Column(db.String(100))

class DanhGia(db.Model):
    id_danhgia = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    tils = db.Column(db.String(200), nullable=False)

class Blog(db.Model):
    id_blog = db.Column(db.Integer, primary_key=True)
    images = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(10), nullable=False)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
