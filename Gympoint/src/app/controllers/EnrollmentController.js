import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, plan_id, start_date } = req.body;
    const date = parseISO(start_date);
    const plan = await Plan.findByPk(plan_id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    // check this student exists
    if (!(await Student.findByPk(student_id))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    // check past dates
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    const price = plan.price * plan.duration;
    const end_date = addMonths(date, plan.duration);
    const enrollment = await Enrollment.create({
      start_date: date,
      end_date,
      price,
      student_id,
      plan_id,
    });
    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration'],
        },
      ],
    });
    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, plan_id, start_date } = req.body;
    const enrollment = await Enrollment.findByPk(req.params.id);
    // check this enrollment there is
    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }
    const date = parseISO(start_date);
    const plan = await Plan.findByPk(plan_id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    // check this student exists
    if (!(await Student.findByPk(student_id))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    // check past dates
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }
    const price = plan.price * plan.duration;
    const end_date = addMonths(date, plan.duration);
    const enrollmentUp = await enrollment.update({
      start_date: date,
      end_date,
      price,
      student_id,
      plan_id,
    });
    return res.json(enrollmentUp);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration'],
        },
      ],
    });
    // check if enrollment exists
    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }
    const e = enrollment;
    await enrollment.destroy();
    return res.json(e);
  }
}

export default new EnrollmentController();
