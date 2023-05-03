/* ESERCIZIO COMPLETO
Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

Ogni volta che cambio mese dovrò:
Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
Controllare quanti giorni ha il mese scelto formando così una lista
Chiedere all’api quali sono le festività per il mese scelto
Evidenziare le festività nella lista
*/

//
function giorniDelMese(mese) {

 var numeroDigiorni = moment ('2018/'+mese+'/01','YYYY/MM/DD').daysInMonth();

 for (var i = 1; i < numeroDigiorni; i++) {
  var currentDate = moment('2018-'+mese+'-'+i, 'YYYY-MM-D').format('YYYY-MM-DD');
  var currentDay = moment(currentDate).format('DD dddd Y');
  $('.main').append('<li data-date="'+currentDate+'">'+currentDay+'</li>');
  //stampo solo il mese corrente
  $("#mese-now").text(moment(mese, "M").format("MMMM"));
  
 }
}

//chiamata api
function festeDelMese(mese) {
 var meseAjax = mese - 1;
 $.ajax({
  url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + meseAjax,
  method : "GET",
  success : function (lista) {
   for (var i = 0; i < lista.response.length; i++) {
    var giorniFestivi = lista.response[i].date;
    var giorniColorati = lista.response[i].name;
    $('.main li[ data-date = "' + giorniFestivi + '"] ').css('color','#e34098').append('' + giorniColorati);
   }
  },

  error : function () {
   alert("Errore");
  }

 });
}

//funzione generale jquery
$( document ).ready(function() {
 var mese = 1;
 giorniDelMese(mese);
 festeDelMese(mese);

//al click sul pulsante avanti cambio mese e aggiungo le festività
 $("#btn-ind").click(function () {
  if (mese == 1){
   mese = 12;
   $('li[ data-date]').remove();
   giorniDelMese(mese);
   festeDelMese(mese);
  }else{
   mese--;
   $('li[ data-date]').remove();
   giorniDelMese(mese);
   festeDelMese(mese);
  }
 })
//al click sul pulsante indietro cambio mese e aggiungo le festività
 $("#btn-ava").click (function () {
  if (mese == 12){
   mese = 1;
   $('li[ data-date]').remove();
   giorniDelMese(mese);
   festeDelMese(mese);
  }else{
   mese ++;
   $('li[ data-date]').remove();
   giorniDelMese(mese);
   festeDelMese(mese);
  }
 })
 // se il mese
 });
