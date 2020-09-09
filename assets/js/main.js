const main = () => {
    getGlobalData();
    getIndonesiaData();
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
}

const getGlobalData = () => {
    init_interactive('section_seluruh_dunia');

    const URL = "https://covid19.mathdro.id/api";
    let section = document.getElementById('section_seluruh_dunia');

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let { confirmed, recovered, deaths, lastUpdate } = data
            section.getElementsByClassName('confirm_count')[0].innerText = confirmed.value.toLocaleString()
            section.getElementsByClassName('recover_count')[0].innerText = recovered.value.toLocaleString()
            section.getElementsByClassName('death_count')[0].innerText = deaths.value.toLocaleString()
        
            // set date 
            document.getElementById('last_update').innerText = formatDate(lastUpdate)
        })
}

const getIndonesiaData = () => {
    init_interactive('section_indonesia');

    const URL = "https://covid19.mathdro.id/api/countries/ID";
    let section = document.getElementById('section_indonesia');

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let { confirmed, recovered, deaths } = data
            section.getElementsByClassName('confirm_count')[0].innerText = confirmed.value.toLocaleString()
            section.getElementsByClassName('recover_count')[0].innerText = recovered.value.toLocaleString()
            section.getElementsByClassName('death_count')[0].innerText = deaths.value.toLocaleString()
        })
}

const init_interactive = (id) => {
    let section = document.getElementById(id);
    let content = section.getElementsByClassName('content')[0];
    section.getElementsByClassName('btn-toggle')[0].onclick = function() {
        // set content to close
        if(this.classList.contains('fa-eye')) {
            content.classList.add('is-hidden');
            this.classList.remove('fa-eye')
            this.classList.add('fa-eye-slash');
        } else {
            content.classList.remove('is-hidden');
            this.classList.add('fa-eye')
            this.classList.remove('fa-eye-slash');
        }
    }
}

main();