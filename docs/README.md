# Aplikacija IRPanel - Izdelava načrta postavitve panelov

##Opis aplikacije
Gre za aplikacijo, kjer uporabnik sestavi "maketo" svojega stanovanja in mu aplikacija na podlagi tega izbere število, ter moč IR panelov za posamezen prostor. Izrisal se bo grafičen prikaz idealne postavitve panelov/montaže v posamezni sobi za stropno montažo. Uporabnik se registra v aplikacijo in lahko kasneje z prijavo ureja podatke. Ko pa se prijavi administrator se mu prikažejo vse dane ponudbe ki jih lahko tudi ureja, lahko dostopa do informacij kupcev, ter v primeru da se kupec odloči za izdelano ponudbo mu izdela tudi predračun.

##Trenutna funkcionalnost:
V program lahko naložimo tloris ali ga slikamo z webkamero, nato podamo merilo za en prostor stanovanja na podlagi katerega se izračuna velikost vnešenih sob na zaslonu. Z klikom na izračun se v center vsakega prostora postavi 700w panel.

##Ciljna publika in naprave
Cilna publika so kupci ki se zanimajo za nakup IR panelov in bi si radi izvedeli informativno koliko bi stala oprema stanovanja. Aplikacija je namenjena za vse naprave - mobilce, tablice ter namizne računalnike.

##Poročilo o delovanju v različnih brskalnikih
Aplikacijo sem testiral v treh različnih brskalnikih: Safari, Chrome ter Firefox. Stran je funkcionalna v vseh treh omenjenih brskalnikih, zaplete sem imel z implementacijo webkamere, ki trenutno deluje le v brskalniku Firefox.

##Posebni gradniki
-"Risalna plošča" na strani za načrtovanje, ki omogoča glede na podano merilo vnos sob, ki jih imamo v stanovanju, ter z klikom na izračun se v prostor postavijo paneli(funkcionalnost izračuna smiselne moči panelov bo izdelana v končni oddaji), stran lahko poljubno resizamo in gradniki bojo obdržali razmerja med njimi

-"Merilo" je izdelano tako, da ga lahko poljubno večamo - tako da ga naravnamo na eno sobo in vpišemo mero in se glede na to izrišejo različno velike sobe. Merilo z pomočjo css gradienta izgleda super.
