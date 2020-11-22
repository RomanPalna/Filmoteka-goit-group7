import darya from '../images/teammate-darya.jpg';
import teamTemplate from '../templates/team.hbs';
import team from './team';

const refs = {
  teamModal: document.querySelector('#root-team-modal'),
  openModal: document.querySelector('.js-team-modal'),
}

function renderTeamModal() {
  const markup = teamTemplate(team);
  refs.teamModal.insertAdjacentHTML('beforeend', markup);
}

renderTeamModal();

function openTeamModal() {
  refs.openModal = document.querySelector('.js-team-modal');
  refs.openModal.addEventListener('click', onOpenTeamModal);
}

openTeamModal();

function onOpenTeamModal() {
  refs.teamModal.classList.add('is-open');
  refs.teamModal.addEventListener('click', onCloseTeamModal);
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
  refs.teamModal.classList.remove('is-open');
  window.removeEventListener('keydown', onPressKey);
}



