import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
//                                   Repository recebe o Appointment como parâmetro da tipagem (o model dele)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date }
        })

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
