const $form = $('#monitor-form')

const $name = $('#name')
const $url = $('#url')
const $regularity = $('#regularity')

const $scriptTarget = $('#scriptTarget')
const $scriptContent = $('#scriptContent')
const $scriptNavigate = $('#scriptNavigate')

const $filterThreshold = $('#filter.threshold')
const $filterWords = $('#filter.words')


const $useJquery = $('#useJquery')
const $notifyChange = $('#notifyChange')
const $notifyUniqueChange = $('#notifyUniqueChange')
const $disabled = $('#disabled')
const $enableUserAgentRandom = $('#enableUserAgentRandom')
const $printscreen = $('#printscreen')
const $printscreenFullPage = $('#printscreenFullPage')
const $pdf = $('#pdf')
const $temporary = $('#temporary')
const $filterDomain = $('#filterDomain')
const $splitable = $('#splitable')

const $nUrl = $('#notification.url')
const $nMethod = $('#notification.method')
const $nTemplate = $('#notification.template')
const $nLevel = $('#notification.level')

const $result = $('#result')


const $btnAdicionarContent = $('#btnAdicionarContent')
const $btnTestar = $('#btnTestar')

const API = 'https://i-wanna-be-notified-api-01.herokuapp.com/api/v1'
// const API = 'http://localhost:9002/api/v1'

// $btnAdicionarContent.click(addNewScriptContent)
$btnTestar.click(testExecution)

function testExecution(){
    sendTesteExecution(createMonitoramento())
}

const sendTesteExecution = (monit) => fetch(`${API}/sync/scraper`,
		{
			method: 'POST',
			body: JSON.stringify(monit),
			headers: { 'content-type': 'application/json' }
		}
	)
	.catch(err => console.error('Erro ao executar monitoramento', err))

const createMonitoramento = () => {
    const monit = {
        url: $url.val(),
        options: {}
    }


    const name = $name.val()
    if (name) monit.name = name

    const scriptTarget = $scriptTarget.val()
    if (scriptTarget) monit.scriptTarget = scriptTarget

    const scriptContent = $scriptContent.val()
    if (scriptContent) monit.scriptContent = [scriptContent]

    const regularity = $regularity.val()
    if (regularity) monit.regularity = parseInt($regularity.val().replace(/\D/g, ''))




    if ($filterWords.val()) {
        monit.filter = {
            threshold: parseFloat($filterThreshold),
            words: ($filterWords.val() || "").split(',')
        }
    }

    const disabled = $disabled.is('checked')
    if (disabled) monit.disabled = disabled

    const scriptNavigate = $scriptNavigate.val()
    if (scriptNavigate) monit.scriptNavigate = scriptNavigate

    const enableUserAgentRandom = $enableUserAgentRandom.is('checked')
    if (enableUserAgentRandom) monit.options.enableUserAgentRandom = enableUserAgentRandom
    
    const useJquery = $useJquery.is('checked')
    if (useJquery) monit.options.useJquery = useJquery
    
    const notifyChange = $notifyChange.is('checked')
    if (notifyChange) monit.options.notifyChange = notifyChange
    
    const notifyUniqueChange = $notifyUniqueChange.is('checked')
    if (notifyUniqueChange) monit.options.notifyUniqueChange = notifyUniqueChange
    
    const printscreen = $printscreen.is('checked')
    if (printscreen) monit.options.printscreen = printscreen
    
    const printscreenFullPage = $printscreenFullPage.is('checked')
    if (printscreenFullPage) monit.options.printscreenFullPage = printscreenFullPage
    
    const pdf = $pdf.is('checked')
    if (pdf) monit.options.pdf = pdf
    
    const temporary = $temporary.is('checked')
    if (temporary) monit.options.temporary = temporary
    
    const filterDomain = $filterDomain.is('checked')
    if (filterDomain) monit.options.filterDomain = filterDomain
    
    const splitable = $splitable.is('checked')
    if (splitable) monit.options.splitable = splitable    
    

    return monit
}

// first, find all the div.code blocks
document.querySelectorAll('div.code').forEach(el => {
// then highlight each
hljs.highlightElement(el);
});