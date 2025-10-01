import {navigate} from './RootNavigation';

export const Quote = [
  '"Satu-satunya cara untuk melakukan pekerjaan hebat yaitu dengan mencintai apa yang sedang kamu lakukan." - Steve Jobs',
  '"Jangan biarkan perasaan putus asa menyerang dirimu. Yakinlah, pada akhirnya, kamu pasti akan berhasil." - Abraham Lincoln',
  '"Semakin keras saya bekerja, maka semakin banyak keberuntungan yang saya miliki." - Thomas Jefferson',
  '"Masa depan itu tergantung pada apa yang sedang kamu lakukan hari ini." - Mahatma Gandhi',
  '"Jika kamu melihat apa yang tidak kamu miliki dalam hidup, kamu pasti tidak akan pernah merasa cukup." - Oprah Winfrey',
  '"Hidup adalah 10% dari apa yang terjadi pada dirimu dan 90% sisanya adalah bagaimana kamu bereaksi terhadapnya." - Charles Swindoll',
  '"Berusahalah untuk tidak menjadi sukses, tapi berusahalah untuk menjadi bernilai." - Albert Einstein',
  '"Bangunlah mimpimu sendiri, atau orang lain akan mempekerjakanmu untuk membangun mimpi mereka." - Farrah Gray',
  '"Jika kesempatan tidak mengetukmu, bangunlah sebuah pintu sendiri." - Milton Berle',
  '"Semakin kamu berbicara tentang hal-hal negatif dalam hidup, maka kamu akan semakin memiliki pikiran negatif. Bicaralah kemenangan bukan kekalahan." - Joel Osteen',
  '"Jangan merasa tertinggal, setiap orang punya proses dan rezeki nya masing-masing." - QS Maryam : 4',
];

export const listMenu = [
  {
    label: 'Durasi Tidur',
    source: require('@images/features/sleep-duration.png'),
    onpress: () => navigate('sleep'),
  },
  {
    label: 'Laporan Bahaya',
    source: require('@images/features/list-hazard.png'),
    onpress: () => navigate('hazard'),
  },
  {
    label: 'Penanganan Bahaya',
    source: require('@images/features/hazard-action.png'),
    onpress: () => navigate('hazard-action'),
  },
  {
    label: 'Cuti & Izin',
    source: require('@images/features/leave.png'),
    onpress: () => navigate('leave-landing'),
  },
  {
    label: 'Kartu Inspeksi',
    source: require('@images/features/inspection.png'),
    onpress: () => navigate('inspection'),
  },
  {
    label: 'e-PKWT',
    source: require('@images/features/pkwt.png'),
    onpress: () => navigate('pkwt'),
  },
  {
    label: 'P2H',
    source: require('@images/features/p2h.png'),
    onpress: () => {
      // navigate('p2h');
      alert('Fitur dalam pengembangan');
    },
  },
  {
    label: 'Menu Lainnya',
    source: require('@images/features/all-menu.png'),
    onpress: () => navigate('others'),
  },
];
