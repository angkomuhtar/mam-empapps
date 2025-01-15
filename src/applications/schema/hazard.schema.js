import {z} from 'zod';

export const hazardSchema = z
  .object({
    id_location: z.number({required_error: 'Lokasi Temuan tidak boleh kosong'}),
    other_location: z
      .string()
      .max(25, {message: 'maksimum 25 karakter'})
      .optional(),
    detail_location: z.string({
      required_error: 'Deskripsikan lokasi temuan yang anda temukan',
    }),
    company_id: z.number({
      required_error: 'pilih salah satu perusahaan',
    }),
    project_id: z.number({
      required_error: 'pilih salah satu',
    }),
    dept_id: z.number({
      required_error: 'pilih salah satu',
    }),
    category: z.enum(['KTA', 'TTA'], {
      required_error: 'pilih salah satu',
    }),
    reported_condition: z.string({
      required_error: 'Deskripsikan kondisi yang anda temukan',
    }),
    recomended_action: z.string({
      required_error: 'Deskripsikan tindakan yang anda rekomendasikan',
    }),
    action_taken: z.string({
      required_error: 'Deskripsikan tindakan yang telah diambil',
    }),
    due_date: z.string({
      required_error: 'Pilih tanggal',
      invalid_type_error: 'Pilih tanggal',
    }),
    report_attachment: z.any().refine(
      data => {
        if (!data || data.length === 0) {
          return false;
        }
        return true;
      },
      {
        message: 'Lampiran tidak boleh kosong',
      },
    ),
  })
  .refine(
    data => {
      if (data.id_location == 999 && !data.other_location) {
        return false;
      }
      return true;
    },
    {
      message: 'Lokasi lainnya harus diisi jika anda memilih lokasi lainnya',
      path: ['other_location'],
    },
  );
