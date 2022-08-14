import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7000;

app.get("/mahasiswa", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findMany();
    if (!mahasiswa) throw new Error("Mahasiswa gak ada");
    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.get("/mahasiswa/:id", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!mahasiswa) throw new Error("Data  Absen Mahasiswa Kosong");

    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.post("/mahasiswa/create", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.create({
      data: {
        nim: req.body.nim,
        nama: req.body.nama,
        keterangan: req.body.keterangan,
      },
    });
    res.send({ message: "Mahasiswa Berhasil di buat", data: mahasiswa });
  } catch (err) {}
});

app.put("/mahasiswa/update/", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.update({
      where: {
        id: req.body.id,
      },
      data: {
        nim: req.body.nim,
        nama: req.body.nama,
        keterangan: req.body.keterangan,
      },
    });
    res.send({ message: "Mahasiswa Berhasil di update", data: mahasiswa });
  } catch (err) {}
});

app.delete("/mahasiswa/delete", async (req, res) => {
  await database.mahasiswa.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Mahasiswa Berhasil di hapus" });
});

app.get("/", (req, res) => {
  res.send({ nama: "Faiz Fadilah" });
});

app.post("/create", (req, res) => {
  res.send({ nama: req.body });
});

app.listen(port, () => {
  console.log(`Aplikasi nya jalan di port ${port}`);
});