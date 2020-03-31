Отчетность для модуля финансового мониторинга СУЗ
=============


Команды для запуска:
-------------------

Запуск в режиме разработки:
```
npm install
```
```
npm run devstart
```



Запуск в docker:
```
docker build -t report_for_module-docker .
```
Собирает docker контейнер
<br />
<br />


```
 docker run --rm -it -p 3000:3000 report_for_module-docker
```
Запускает приложение по адресу <http://localhost:3000/>

