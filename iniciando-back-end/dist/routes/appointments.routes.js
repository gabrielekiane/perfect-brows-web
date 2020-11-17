"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var date_fns_1 = require("date-fns");
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
var appointmentsRouter = express_1.Router();
// instanciando a classe:
var appointmentsRepository = new AppointmentsRepository_1.default();
appointmentsRouter.get('/', function (request, response) {
    var appointments = appointmentsRepository.returnAll();
    return response.json(appointments);
});
appointmentsRouter.post('/', function (request, response) {
    try {
        var _a = request.body, provider = _a.provider, date = _a.date;
        var parsedDate = date_fns_1.parseISO(date);
        var createAppointment = new CreateAppointmentService_1.default(appointmentsRepository);
        var appointment = createAppointment.execute({ date: parsedDate, provider: provider });
        return response.json(appointment);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = appointmentsRouter;
