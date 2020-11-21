
import teamTemplate from '../templates/team.hbs';
import team from './team';

const refs = {
  TeamModal: document.querySelector('#root-team-modal')
}


function renderTeamModal() {
  const markup = teamTemplate(team);
  refs.TeamModal.insertAdjacentHTML('beforeend', markup);
}

renderTeamModal();

function onOpenTeamModal() {
  refs.TeamModal.classList.add('is-open');
  refs.TeamModal.addEventListener('click', onCloseTeamModal);
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
  refs.TeamModal.classList.remove('is-open');
  window.removeEventListener('keydown', onPressKey);
}


onOpenTeamModal();
