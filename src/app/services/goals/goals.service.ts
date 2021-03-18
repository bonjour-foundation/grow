import {Injectable} from '@angular/core';

import {Observable, of, ReplaySubject} from 'rxjs';

import {del, get, set} from 'idb-keyval';

import {addDays} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private goal: ReplaySubject<Goal | undefined> = new ReplaySubject(1);

  private allGoals: Goals = {
    health: ['eat_fit', '8_hours_sleep', '2_liters_water', 'memory_training', 'lose_weight', 'health_check', 'relaxing', 'long_walk', 'deep_breath', 'laugh'],
    social: [
      'help_a_neighbor',
      'visit_a_friend',
      'invite_someone_for_a_coffee',
      'go_for_a_walk_with_someone',
      'find_classmates',
      'bench_in_parc',
      'contact_old_friend',
      'get_help',
      'letter',
    ],
    culture: [
      'learning_a_language',
      'learn_something_new',
      'train',
      'attend_a_concert',
      'education',
      'culture',
      'book',
      'picasso',
      'do_something_just_for_yourself',
      'listen_to_music',
      'game',
      'podcast',
    ],
    home: ['spring_cleaning', 'vacuum', 'clean_the_windows', 'clean_air', 'clear_things', 'remove_waste', 'conversion', 'flowers', 'change_of_scene'],
    space: ['explore', 'visit_a_local_shop', 'have_a_coffee', 'visit_tree', 'sit_on_a_bench', 'train', 'not_alone', 'biodiversity'],
    finance: [
      'remove_waste',
      'through_books',
      'auction',
      'i_have_too_much',
      'i_have_no_enough',
      'local_offering',
      'gratitude',
      'not_eating_enough_there',
      'eat_with_someone',
      'elegance',
    ],
  };

  goals(category: string): Observable<string> {
    return of(this.allGoals[category]);
  }

  add(category: string, goal: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const newGoal: Goal = {
          category,
          goal,
          expire_at: addDays(new Date(), 7),
        };

        await set('goal', newGoal);

        this.goal.next(newGoal);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  init(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const goal: Goal = await get('goal');

        this.goal.next(goal);

        resolve();
      } catch (err) {
        this.goal.next(undefined);
        reject(err);
      }
    });
  }

  watch(): Observable<Goal> {
    return this.goal.asObservable();
  }

  async reset() {
    await del('goal');
    this.goal.next(undefined);
  }
}
