import { handleAppointment } from '../../../lib/appointmentHandler.js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  return handleAppointment(request);
}
