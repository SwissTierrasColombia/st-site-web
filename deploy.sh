#!/bin/bash
cd /home/ubuntu/st-site-web && rm -rf /home/ubuntu/st-site-web/dist && npm run build && sudo rm -rf /var/www/st/html/dist/ && sudo mv dist/ /var/www/st/html/
