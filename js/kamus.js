window.onload=function(){
  function tanggalHariIni(){
    var namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var tanggal = new Date().getDate();
    var bulan = new Date().getMonth();
    var hariIni = namaHari[new Date().getDay()];
    var Tahun = (new Date().getYear() < 1000) ? new Date().getYear() + 1900 : new Date().getYear();
    return hariIni + ', ' + tanggal + ' ' + namaBulan[bulan] + ' ' + Tahun;
  };
  document.getElementById('tanggal').textContent=tanggalHariIni();
  
  function Jam(element){
    setInterval(function startTime() {
      var hariIni=new Date(),
          jam=hariIni.getHours(),
          menit=hariIni.getMinutes(),
          detik=hariIni.getSeconds();
       if(jam<10)jam='0'+jam;   
       if(menit<10)menit='0'+menit;   
       if(detik<10)detik='0'+detik;   
      document.getElementById(element).innerHTML=jam+":"+menit+":"+detik;
    }, 500);
  };
  Jam('jam');
  var database="data/en_id_id_en";
  var db;
  db=database||"data/en-kamus";
  var kamusDB=[]; 
  function loadingKamus(kms){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", kms,false);
    xhr.onload = parse;
    xhr.send();
  };
  function parse() {
      kamusDB=this.response
      kamusDB.trim();
      kamusDB=kamusDB.split('\n').join('\n');
      kamusDB=kamusDB.split('\n');
  };
  
  loadingKamus(db);
  
  function thesaurus(kata){
    var kata_diminta = kata;
    var kata_jawab="";
    var query=[0,1];
    var result=[];
    for (i=0; i< kamusDB.length; i++){
      var tmp = kamusDB[i];
      result[0]=tmp.split(',')[0];
      result[1]=tmp.slice(tmp.indexOf(',')+1);
      if(kata_diminta == result[query[0]]) kata_jawab = result[query[1]];
    } 
    return kata_jawab;
  };
  /*
  var kamusBtn=document.getElementById('kamusBtn');
  var kamus=document.getElementById('kamus');
  kamus.style.display='none';
  var kamusStatus=true;
  kamusBtn.addEventListener('click', toggleKamus, false);
  function toggleKamus() {
    if(kamusStatus) {
      kamus.style.display='block';
      kamusBtn.innerHTML = "Hide Kamus Id-Eng/Eng-Id";
      kamusStatus = false;
    } else {
      kamus.style.display='none';
      kamusBtn.innerHTML = "Kamus Id-Eng/Eng-Id";
      kamusStatus = true;
    }
  }; 
  */
  var terjemahan=document.getElementById('terjemahan');
  var TextInput = document.getElementById('TextInput');
  TextInput.title='Tulis satu kata bah. Inggris atau bah. Indonesia';
  TextInput.oninput=function (e){
  	e.preventDefault();
  	terjemahan.textContent = '';
    textToConvert = TextInput.value;
    textToConvert=textToConvert.toLowerCase();
    terjemahan.style.display = 'block';
    //console.log(thesaurus(textToConvert,"en_id_id_en"));
    terjemahan.textContent=thesaurus(textToConvert);
  };
  TextInput.onmouseout=function (e){
    terjemahan.style.display='none';
  };
  TextInput.onmouseover=function (e){
    terjemahan.style.display='block';
  };
}
