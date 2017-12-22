import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AService } from './a-service.service';

@Injectable()
export class PolicyService extends AService {

  constructor(http: HttpClient) {
    super(http);
  }

  getCookiePolicy(): any {
    let policy = {text:null};
    policy.text = `<p>Questa informativa sull’utilizzo dei&nbsp;<em>cookie</em>&nbsp;sul dominio web www.torino9.it  e sui sottodomini relativi (.torino9.it) è resa all’Utente in attuazione del provvedimento del Garante per la protezione dei dati personali del 8 maggio 2014: “<em>Individuazione delle modalità semplificate per l’informativa e l’acquisizione del consenso per l’uso dei cookie</em>” e nel rispetto dell’art. 13 del Codice privacy (D.Lgs. n. 196/2003).</p><p>I <em>cookie</em> sono stringhe di testo di piccole dimensioni che i siti visitati dall’Utente inviano al suo terminale (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo Utente. Nel corso della navigazione su un sito, l’Utente può ricevere sul suo terminale anche cookie che vengono inviati da siti o da web server diversi (c.d. “<em>terze parti</em>“), sui quali possono risiedere alcuni elementi (quali, ad esempio, immagini, mappe, suoni, specifici link a pagine di altri domini) presenti sul sito che lo stesso sta visitando.</p><p>Esistono&nbsp;<strong>due macro-categorie fondamentali</strong>, con caratteristiche diverse:&nbsp;“<strong><em>cookie</em>&nbsp;tecnici” e&nbsp;“<em>cookie</em>&nbsp;di profilazione”.</strong></p><p>I&nbsp;<strong><em>cookie</em>&nbsp;tecnici</strong> sono generalmente necessari per il corretto funzionamento del sito web e per permettere la navigazione; senza di essi si potrebbe non essere in grado di visualizzare correttamente le pagine oppure di utilizzare alcuni servizi. Per esempio, un&nbsp;<em>cookie</em>&nbsp;tecnico è indispensabile per mantenere l’Utente collegato durante tutta la visita a un sito web, oppure per memorizzare le impostazioni della lingua, della visualizzazione, e così via.</p><p>I <strong><em>cookie</em> di profilazione</strong> sono volti a creare profili relativi all’Utente e vengono utilizzati al fine di inviare messaggi pubblicitari in linea con le preferenze manifestate dallo stesso nell’ambito della navigazione in rete. In ragione della particolare invasività che tali dispositivi possono avere nell’ambito della sfera privata degli Utenti, la normativa europea e italiana prevede che l’Utente debba essere adeguatamente informato sull’uso degli stessi ed esprimere così il proprio valido consenso.</p><p>torino9.it utilizza <strong>cookie tecnici</strong>, utilizzati per la memorizzazione temporanea dei dati di account per l’accesso alle aree riservate del Sito.</p><strong>&nbsp;</strong>I cookie utilizzati sul dominio www.torino9.it e sottodomini <strong>non consentono la raccolta di informazioni personali</strong> relative all’Utente e si cancellano automaticamente con la chiusura del browser di navigazione.</p><p>I cookie utilizzati sul dominio www.torino9.it  e sottodomini <strong>non sono utilizzati per attività di profilazione</strong> dell’Utente.</p><p>L’Utente può scegliere di abilitare o disabilitare i cookie intervenendo sulle impostazioni del proprio browser di navigazione secondo le istruzioni rese disponibili dai relativi fornitori.</p>`;
    return policy;
  }


}
