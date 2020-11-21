
import teamTemplate from '../templates/team.hbs';
import team from './team';

const refs = {
  rootTeamModal: document.querySelector('#root-team-modal')
}


function renderTeamModal() {
  const markup = teamTemplate(team);
  refs.rootTeamModal.insertAdjacentHTML('beforeend', markup);
}

renderTeamModal();

function onOpenTeamModal() {
  refs.rootTeamModal.classList.add('is-open');
  refs.rootTeamModal.addEventListener('click', onCloseTeamModal);
  window.addEventListener('keydown', onPressKey);
}

function onPressKey(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
  }
}

function onCloseTeamModal(e) {
  if (
    e.target.className !== 'lightbox__overlay' &&
    e.target.className !== 'lightbox__button'
  ) {
    return;
  }
  closeTeamModal();
}

function closeTeamModal() {
  refs.rootTeamModal.classList.remove('is-open');
  window.removeEventListener('keydown', onPressKey);
}


onOpenTeamModal();
