export class CreateProjectile {
    name = 'createProjectile'
    target
    projectileSpeed

    constructor(projectileSpeed, target) {
        this.target = target
        this.projectileSpeed = projectileSpeed
    }
}