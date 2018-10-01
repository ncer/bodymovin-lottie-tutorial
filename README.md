* [Введение](README.md)
* [Подготовительный этап](tutorial/beginning.md)
* [Этапы работы в After Effects](tutorial/after-effects-beginning.md)
* [Создание анимаций в After Effects](tutorial/after-effects-animations.md)
* [Экспорт анимаций с помощью Bodymovin](tutorial/bodymovin-export.md)
* [Работа с Lottie](tutorial/lottie.md)

# Bodymovin и Lottie

**Bodymovin** - это плагин для *After Effects* (далее - AE), который экспортирует все анимации в json. 

**Lottie** - это движок от *Airbnb*, который позволяет проигрывать анимации на основе json, созданного с помощью *Bodymovin*. Кроме веб-плеера есть также плееры для React-native, ios и android.

И сразу [примеры](https://codepen.io/collection/nVYWZR/), чтобы было понятно, о чем речь.

## Установка

AE можно найти на известном трекере (брал сборку от m0nkrus).

[Инструкция по установке Bodymovin](http://airbnb.io/lottie/after-effects/bodymovin-installation.html).

[Инструкция по установке веб-версии Lottie](http://airbnb.io/lottie/web/getting-started.html).

## Схема работы и подводные камни

Общая схема такая:

1. cоздать SVG в Illustrator
1. экспортировать в AE
1. заанимировать там же
1. экспортировать в json через Bodymovin
1. воспроизвести на сайте с помощью Lottie

Очень многое зависит от этапов 1 и 3. Список ограничений для этих этапов довольно большой https://docs.google.com/document/d/1sY1O3xICO91N6jQ20ulU_AKW-JLXNOha2uN549w7t9A/edit

На этапе анимирования и экспорта в json получившийся json может содержать `encoded expressions`, из-за которых ничего не заработает ([issue](https://github.com/airbnb/lottie-web/issues/672)). По этой причине [Animation Composer](https://aescripts.com/animation-composer/) не совместим с Bodymovin (генерирует "плохой" json).

![encoded-expressions](/assets/encoded-expressions.png)

## Полезные ссылки

[Официальная документация](http://airbnb.io/lottie/).

[Lottie, практики по работе и подготовке анимаций](https://blog.untimestudio.com/lottie-%D0%BB%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B8-%D0%BF%D0%BE-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B5-%D0%B8-%D0%BF%D0%BE%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B5-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D0%B9-edf7b53fac5e).

Видео: [Как создать SVG анимацию без навыков кодинга. After Effects + Bodymovin (Lottie)](https://www.youtube.com/watch?v=bXOdoZqlyUo).








