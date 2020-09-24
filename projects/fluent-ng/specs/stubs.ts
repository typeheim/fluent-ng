import { ChangeDetectorRef } from '@angular/core';

export class ChangeDetector extends ChangeDetectorRef {
  /**
   * When a view uses the {@link ChangeDetectionStrategy#OnPush OnPush} (checkOnce)
   * change detection strategy, explicitly marks the view as changed so that
   * it can be checked again.
   *
   * Components are normally marked as dirty (in need of rerendering) when inputs
   * have changed or events have fired in the view. Call this method to ensure that
   * a component is checked even if these triggers have not occured.
   */
  markForCheck(): void {}

  /**
   * Detaches this view from the change-detection tree.
   * A detached view is  not checked until it is reattached.
   * Use in combination with `detectChanges()` to implement local change detection checks.
   *
   * Detached views are not checked during change detection runs until they are
   * re-attached, even if they are marked as dirty.
   */
  detach(): void {}

  /**
   * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach
     * detach}
   * to implement local change detection checks.
   */
  detectChanges(): void {}

  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * Use in development mode to verify that running change detection doesn't introduce
   * other changes.
   */
  checkNoChanges(): void {}

  /**
   * Re-attaches the previously detached view to the change detection tree.
   * Views are attached to the tree by default.
   */
  reattach(): void {}
}
