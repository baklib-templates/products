import * as Turbo from "@hotwired/turbo"
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { Application } from "@hotwired/stimulus"
import LoadMoreController from "./../controllers/load_more_controller"
import { registerProductHub } from "./product_hub"

window.Alpine = Alpine
Alpine.plugin(collapse)
registerProductHub()
Alpine.start()

import "./../controllers"
const application = Application.start()
application.register("load-more", LoadMoreController)
