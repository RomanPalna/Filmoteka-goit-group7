(() => {
    const refs = {
        openModal: document.querySelector('galery_item'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
    };

    refs.openModal.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal() {
        document.body.classList.remove('modal-open')
        refs.modal.classList.toggle('is-hidden');
    }
})();