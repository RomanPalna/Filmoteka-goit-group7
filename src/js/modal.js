(() => {
    const refs = {
        openModal: document.querySelector('card__link'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
    };

    // refs.openModal.addEventListener('click', toggleModal);
    // refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal() {
        console.log('click');
        e.preventDefault();
        document.body.classList.toggle('modal-open')
        refs.modal.classList.toggle('is-hidden');
        return false;

    }
})();