import express from 'express';
import { apiRouter } from '../api';
import { pageController } from '../../controllers';
import pages from '../../../hybrid/components/pages';

export const router = express.Router();

router.get( '/', pageController.getPage);

pages.forEach(page => {
    router.get(page.default.meta?.url, pageController.getPage)
})

router.use('/api', apiRouter)