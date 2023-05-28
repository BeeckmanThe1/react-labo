import { Request, Response } from 'express'
import { getBasicSkeleton } from '../../html/htmlTemplateProvider';
import Homepage from '../../../hybrid/components/pages/homepage/homepage.page';

const getPage = (req: Request, res: Response) => {
    const url = req?.url
    const newUrl = url === '/' ? Homepage.meta.url : url

    res.send(getBasicSkeleton({ url: newUrl }))
}

export default {
    getPage
}