/** @type {import('./$types').PageLoad} */
import { datapolicyData } from "$database/global_db.js";

const textPolicy = {
  introduction: {
    title: "Le responsable de ce site internet est :",
    text: "Donato Ricci c.o medialab Sciences Po <br><br> Sciences Po – Site Saint-Thomas d’Aquin <br> 1 place Saint-Thomas d’Aquin <br> 75007 Paris, France <br><br> <a href='mailto:donato.ricci@sciencespo.fr'>donato.ricci@sciencespo.fr</a>"
  },
  hebergement: {
    title: "Hébergement",
    text: "Ce site internet est hébergé par la Fondation Nationale des Sciences Politiques (FNSP): <br><br> Sciences Po - Direction des Systèmes d'Information <br> Code APE: 803Z <br> 27, rue saint Guillaume <br> 75337 Paris cedex 07 <br><br> Le laboratoire chargé de l’édition et du suivi et de l’hébergement du site web est le médialab. Sciences Po s’engage à faire ses meilleurs efforts pour fournir une continuité de disponibilité du site web aux utilisateurs. Toutefois, Sciences Po ne pourra en aucun cas être tenu responsable de toute interruption de services intervenant sur le site web"
  },
  finalite: {
    title: "Finalité, accès, utilisation et disponibilité du site web",
    text: "Sciences Po met tout en œuvre pour offrir aux visiteurs du site web des informations et/ou outils disponibles et vérifiés. Malgré tous les soins apportés, les informations sont fournies sans garantie d'aucune sorte. Elles sont non contractuelles, peuvent contenir des inexactitudes techniques ou typographiques et sont sujettes à modification sans préavis. Sciences Po ne saurait être tenu pour responsable d’une absence de disponibilité ou mise-à-jour des informations, d’inexactitudes, d’incomplétudes, d’erreurs et/ou de la présence d’un virus sur le site web.<br><br> Sciences Po invite les visiteurs du site web à lui faire part et à préciser la nature d’éventuelles omissions, erreurs ou corrections, en adressant un courrier électronique à l’adresse <a href='mailto:medialab@sciencespo.fr'>medialab@sciencespo.fr</a>.<br><br> De même, Sciences Po ne peut être tenu responsable en cas de mauvaise utilisation du site web par le visiteur ou en cas d’indisponibilité temporaire du service(cas de force majeure, de période de maintenance ou d’incident technique, quel qu’il soit).<br><br> Il est expressément entendu par le visiteur du site web qu'en aucun cas Sciences Po ne peut être tenu responsable des dommages quelconques, directs ou indirects, matériels ou immatériels résultant notamment de la consultation et/ou de l'utilisation du site web(ou d'autres sites qui lui sont liés) et des éventuelles applications en téléchargement, comme de l'utilisation des informations textuelles ou visuelles, qui auraient pu être recueillies et notamment de tout préjudice financier ou commercial, de pertes de programmes ou de données dans son système d'information.<br><br> En utilisant ce site web, le visiteur reconnaît avoir eu la possibilité de prendre connaissance de cet avertissement."
  },
  propriete: {
    title: "Propriété Industrielle et Intellectuelle",
    text: "Sauf mentions contraires, toutes les informations reproduites sur ce site web (textes, photos, logos...) sont protégées par des droits de propriété intellectuelle détenus par Sciences Po ou par ses partenaires. Par conséquent, aucune de ces informations ne peut être reproduite, modifiée, rediffusée, traduite, exploitée commercialement ou réutilisée de quelque manière que ce soit sans l'accord préalable et écrit de Sciences Po. Le titre, la conception, la forme du site Sciences Po mais aussi son contenu tels que les descriptions, illustrations et images originales et leur organisation sont la propriété de Sciences Po.<br><br>Le code source de ce site web est libre sous licence <a href='https://www.gnu.org/licenses/agpl-3.0-standalone.html'>GNU Affero General Public 3.0 (AGPL) </a> et disponible sur <a href='https://github.com/medialab/website/blob/master/LICENSE.txt'> GitHub </a>"
  },
  liens: {
    title: "Les liens hypertextes",
    text: "Nos pages web proposent également des liens vers d'autres sites pour lesquels nous ne sommes responsables ni de leur intégral respect aux normes d'ordre public et bonnes mœurs, d'une part, ni de leur politique de protection des données personnelles ou d'utilisation qui en seraient faites, d'autre part. En accédant à un autre site, par l'intermédiaire d'un lien hypertexte, vous acceptez que cet accès s'effectue à vos risques et périls. En conséquence, tout préjudice direct ou indirect résultant de votre accès à un autre site relié par un lien hypertexte ne peut engager la responsabilité de Sciences Po."
  },
  images: {
    title: "Images et iconographies",
    text: "Les images du site sont libres de droit (sauf mentions contraires) ou sont la propriété de Sciences Po."
  },
  informatique: {
    title: "Informatique et Libertés",
    text: "En vertu de l'article 6.1.e du Règlement général européen sur la protection des données 2016/679 (dit “RGPD”), les données personnelles traitées sur le site web sont, selon les finalités de traitement, nécessaires à l’exécution de la mission de service public de Sciences Po. <br><br> Ce site ne collecte aucune information personnelle, à l'exception des formulaires d'inscription à différents évènements comme le séminaire du médialab ainsi que des données brutes anonymisées de visites et d'actions collectées par Matomo, un traceur d'audience hébergé à SciencesPo pour la production de statistiques de consultation du site web. <br><br> Cette collecte se fait sans utiliser de cookies et respecte les paramètres de votre navigateur en matière de confidentialité.Les données brutes anonymisées de visites sont uniquement consultées par le médialab à des fins d'amélioration de l'expérience utilisateur. <br><br> Sciences Po invite les visiteurs à informer ses services dans les plus brefs délais en cas de violation des données personnelles. Complétez alors le formulaire ou envoyez un mail à <a href='mailto:dataprotection@sciencespo.fr'>dataprotection@sciencespo.fr</a>. Vous pouvez exercer vos droits d'accès, de modification, de rectification ou de suppression des données personnelles vous concernant en nous écrivant. <br><br> Par courrier : médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07 <br> Par courrier électronique: <a href='mailto:medialab@sciencespo.fr'>medialab@sciencespo.fr</a> <br><br> Le visiteur peut également contacter le Délégué à la Protection des Données de Sciences Po à l’adresse <a href='mailto:cnil@sciencespo.fr'>cnil@sciencespo.fr</a> en seconde intention, puis adresser une réclamation à la <a href='https://www.cnil.fr/'>CNIL</a>, en cas de difficultés ou questions ultérieures concernant ses droits RGPD."
  }
}

export function load() {
  return {
    title: datapolicyData.About.Title,
    subtitle: datapolicyData.About.Subtitle,
    textPolicy
  };
}
