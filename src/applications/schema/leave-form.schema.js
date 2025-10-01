import {z} from 'zod';

export const leaveFormSchema = z.object({
  absence_type_id: z.number({
    required_error: 'Jenis Cuti tidak boleh kosong',
  }),
  totalDay: z
    .number({
      required_error: 'Total Hari tidak boleh kosong',
    })
    .min(1, 'Total Hari minimal 1 hari'),
  dateFrom: z.string({
    required_error: 'Tanggal Mulai tidak boleh kosong',
  }),
  dateTo: z.string({
    required_error: 'Tanggal Selesai tidak boleh kosong',
  }),
  notes: z.string().max(1000).optional(),
});
