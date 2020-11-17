import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    // toda vez que temos uma função asíncrona, retornamos um promise e o que passamos dentro do parametro da promise
    // é o retorno que a promise vai ter qnd finalizar, q será o response
    public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError ('This appointment is already booked, but you can try another hour!');
        }

        // aqui apenas criando o objeto mas ainda não salvando no banco
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        //salvando o appointment no banco
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
