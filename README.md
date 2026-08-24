# lembergtrans.com — staging preview

Прототип нового корпоративного сайту **Lemberg Group** (lembergtrans.com) для узгодження
з клієнтом і передачі розробнику. Це **не бойовий сайт**.

**https://olehvitkalg.github.io/lembergtrans-preview/**

## Що тут

Одна збірка, 10 сторінок: Home · Services · Fleet · Coverage · Technology · About · Blog ·
Contact · Request a Quote · Privacy Policy.

Статичний HTML/CSS без збірників і фреймворків. Іконки — inline SVG
(Font Awesome Free 6.5.2, CC BY 4.0, `assets/icons/`). Єдина зовнішня залежність — Roboto
з Google Fonts.

У квадратних дужках `[...]` — дані, які ще має надати клієнт. Вигаданих цифр тут немає.

## Індексація вимкнена

Кожна сторінка містить:

```html
<meta name="robots" content="noindex, nofollow">
```

`robots.txt` **навмисно дозволяє** сканування. Якби він блокував (`Disallow: /`), краулер
не зміг би прочитати `noindex` — і Google міг би показати голий URL, знайшовши його зі сторони.
Це класична помилка зі staging-сайтами.

Окремо: для GitHub Pages **project page** файл `robots.txt` із підпапки не читається взагалі —
краулери беруть його лише з кореня `olehvitkalg.github.io`. Тому індексацію тримає саме мета-тег.

> **Перед перенесенням на бойовий lembergtrans.com мета-тег `noindex` треба зняти**,
> інакше справжній сайт не потрапить у пошук.

## Оновлення

Джерело — `D:\Claude\Lemberg\lembergtrans\`. Правки вносяться там, далі:

```bash
python tools/deploy-preview.py
cd lembergtrans-preview && git add -A && git commit -m "..." && git push
```

Скрипт копіює збірку, штампує CSS хешем вмісту і перевіряє, що `noindex` на місці.
Штамп потрібен тому, що GitHub Pages віддає CSS із `max-age=600` — без нього десять хвилин
після пуша видно стару таблицю стилів.

Файли в цьому репозиторії напряму не правимо — їх перезапише наступний деплой.
