// İlk olarak gerekli modülleri yükleyin:
// npm install express nodemailer cors body-parser

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // E-posta gönderimi için SMTP ayarlarını yapın
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'omeryasindemir66@gmail.com', // Gmail adresiniz
      pass: 'awdv jbzw axef cjnm', // Gmail şifreniz
    },
  });

  // E-posta içeriği oluşturun (HTML tablosu ekledik)
  const mailOptions = {
    from: 'omeryasindemir66@gmail.com',
    to: 'omeryasindemir66@gmail.com',
    subject: 'İzin Formu',
    html: `
      <div>
        <h2>İzin Formu Bilgileri</h2>
        <table border="1" cellpadding="5">
          <tr>
            <td>İzin Sebebi</td>
            <td>${formData.sebep}</td>
          </tr>
          <tr>
            <td>İletişim Numarası</td>
            <td>${formData.iletisim_no}</td>
          </tr>
          <tr>
            <td>Personel Tarih</td>
            <td>${formData.p_tarih}</td>
          </tr>
          <tr>
            <td>Personel Ad Soyad</td>
            <td>${formData.p_ad_soyad}</td>
          </tr>
          <tr>
            <td>Personel Unvan</td>
            <td>${formData.p_unvan}</td>
          </tr>
          <tr>
            <td>Personel İmza</td>
            <td>${formData.p_imza}</td>
          </tr>
          <tr>
            <td>İşveren Tarih</td>
            <td>${formData.i_tarih}</td>
          </tr>
          <tr>
            <td>İşveren Ad Soyad</td>
            <td>${formData.i_ad_soyad}</td>
          </tr>
          <tr>
            <td>İşveren Unvan</td>
            <td>${formData.i_unvan}</td>
          </tr>
          <tr>
            <td>İşveren İmza</td>
            <td>${formData.i_imza}</td>
          </tr>
          <tr>
            <td>İzin İstek Tarihi</td>
            <td>${formData.izin_istek_tarihi}</td>
          </tr>
          <tr>
            <td>İzine Ayrılış Tarihi</td>
            <td>${formData.izin_ayrilis_tarihi}</td>
          </tr>
          <tr>
            <td>İzin Dönüş Tarihi</td>
            <td>${formData.izin_donus_tarihi}</td>
          </tr>
          <tr>
            <td>Kullanılan İzin Süresi (Saat)</td>
            <td>${formData.kullanilan_izin_suresi}</td>
          </tr>
          <tr>
            <td>Açıklamalar</td>
            <td>${formData.des}</td>
          </tr>
        </table>
      </div>
    `,
  };

  // E-postayı gönderin
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Form submitted successfully');
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
