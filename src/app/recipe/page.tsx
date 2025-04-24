'use client';

import { Jost } from 'next/font/google';
import { Container, Image } from 'react-bootstrap';
import '../globals.css';

// import font
const jost = Jost({ subsets: ['latin'] });

const Recipe = () => (
  <main className={`${jost.className} recipe`}>
    <h1 className="text-center py-3">Apple Pie</h1>

    <Container className="flex-container">
      <Image src="pie.jpg" className="recipe-image" alt="Apple Pie" fluid />
      <div className="recipe-text">
        <section className="description">
          <h2>About This Recipe</h2>
          <p>
            Growing up in a small town, my grandmother’s apple pie was the heart of every family gathering. It wasn’t
            just the sweetness of the apples or the buttery crust that made it special; it was the memories baked into
            every slice. I remember spending hours in her kitchen, watching her hands work magic as she peeled apples,
            dusted them with cinnamon, and carefully folded the dough. There was always a little secret—she’d add a dash
            of nutmeg, just enough to give the pie that extra warmth.
          </p>
          <p>
            I never understood why her pies always tasted so much better than anyone else’s, but I think it was because
            she put so much love into them. Apple pie, for her, wasn’t just a recipe; it was a tradition, passed down
            from her grandmother, a way to bring the family together. The kitchen was always filled with the scent of
            freshly baked pie, a smell that could make anyone feel at home, even on the coldest winter days.
          </p>
          <p>
            Now, whenever I bake this apple pie, it’s like I can hear my grandmother’s voice, reminding me to take my
            time and savor the process. The pie has become more than just dessert—it’s a piece of my past, a connection
            to my roots, and a reminder that the best things in life are made with love, one step at a time.
          </p>
        </section>
        <section className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li>6 to 8 apples (Granny Smith or Honeycrisp recommended)</li>
            <li>1 cup granulated sugar</li>
            <li>2 tablespoons all-purpose flour</li>
            <li>1 teaspoon ground cinnamon</li>
            <li>1/4 teaspoon ground nutmeg</li>
            <li>1 tablespoon lemon juice</li>
            <li>1 tablespoon butter, cut into small pieces</li>
            <li>1 package refrigerated pie crusts (or homemade crust)</li>
          </ul>
        </section>
        <section className="instructions">
          <h2>Instructions</h2>
          <ol>
            <li>Preheat your oven to 425°F (220°C).</li>
            <li>Peel, core, and slice the apples into thin wedges.</li>
            <li>
              In a large bowl, combine the apples, sugar, flour, cinnamon, nutmeg, and lemon juice. Toss until the
              apples are well coated.
            </li>
            <li>Roll out one pie crust and place it in a 9-inch pie dish.</li>
            <li>Pour the apple mixture into the crust and dot with butter pieces.</li>
            <li>
              Roll out the second pie crust and place it over the filling. Seal and flute the edges. Cut slits in the
              top crust to allow steam to escape.
            </li>
            <li>
              Bake in the preheated oven for 15 minutes. Reduce the temperature to 350°F (175°C) and continue baking for
              30-35 minutes, or until the apples are tender and the crust is golden brown.
            </li>
            <li>Let the pie cool for at least 2 hours before slicing. Serve warm or at room temperature.</li>
          </ol>
        </section>
      </div>
    </Container>
    <br />
  </main>
);

export default Recipe;
