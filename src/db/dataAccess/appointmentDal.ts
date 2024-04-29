import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";

export const fetchAllAppointments = async (search?: string) => {
  const keyword = search
    ? {
        $or: [{ userId: search }, { doctorId: search }],
      }
    : {};

  const appointments = await Appointment.find(keyword)
    .populate("doctorId")
    .populate("userId");
  return appointments;
};

export const saveAppointment = async (
  appointmentData: any,
  userNotificationData: any,
  doctorNotificationData: any
) => {
  const appointment = new Appointment(appointmentData);
  const userNotification = new Notification(userNotificationData);
  const doctorNotification = new Notification(doctorNotificationData);

  await Promise.all([
    appointment.save(),
    userNotification.save(),
    doctorNotification.save(),
  ]);

  return appointment;
};

export const markAppointmentAsCompleted = async (appointmentId: string) => {
  const alreadyFound = await Appointment.findByIdAndUpdate(
    { _id: appointmentId },
    { status: "completed" }
  );
  return alreadyFound;
};
