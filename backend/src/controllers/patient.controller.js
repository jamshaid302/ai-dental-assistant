const prisma = require("../config/prisma");

exports.createPatient = async (req, res) => {
  const { name, email, phone = null, dob, medicalNotes = null } = req.body;

  const patient = await prisma.patient.create({
    data: {
      name,
      email,
      phone,
      dob: new Date(dob),
      medicalNotes,
      userId: req.user.id,
    },
  });

  res.json(patient);
};

exports.getPatients = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      where: { userId: req.user.id },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.patient.count({
      where: { userId: req.user.id },
    }),
  ]);

  res.json({ patients, total });
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;

  const patient = await prisma.patient.update({
    where: { id },
    data: req.body,
  });

  res.json(patient);
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  await prisma.patient.delete({ where: { id } });

  res.json({ message: "Deleted" });
};
