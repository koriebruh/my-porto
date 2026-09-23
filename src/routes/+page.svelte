<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import LogoSlot from '$lib/components/logo-slot.svelte';
	import TechIcon, { hasTechIcon } from '$lib/components/tech-icon.svelte';
	import ArchPatterns from '$lib/components/arch-patterns.svelte';
	import LottiePulse from '$lib/components/lottie-pulse.svelte';
	import ContactIcon from '$lib/components/contact-icon.svelte';
	import PlasmaField from '$lib/components/plasma-field.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import ProjectModal from '$lib/components/project-modal.svelte';
	import { reveal, enter, parallax, countUp } from '$lib/actions/reveal';

	import mePhoto from '$lib/assets/about/me-web.jpg';
	import monarchLogo from '$lib/assets/experice/monarch/Monarch-Inti-Teknologi-250X60-1.png';
	import mit1 from '$lib/assets/experice/monarch/mit1-web.jpg';
	import mit2 from '$lib/assets/experice/monarch/mit2-web.jpg';
	import mit3 from '$lib/assets/experice/monarch/mit3-web.jpg';
	import firstudioLogo from '$lib/assets/experice/firstudio/firsudio.png';
	import fs1 from '$lib/assets/experice/firstudio/fs1-web.jpg';
	import pwmjatengLogo from '$lib/assets/experice/pwmjateng/pwmjateng.png';
	import udinusLogo from '$lib/assets/experice/educations/udinus.png';
	import edu1 from '$lib/assets/experice/educations/edu1-web.jpg';
	import edu2 from '$lib/assets/experice/educations/edu2-web.jpg';
	import edu3 from '$lib/assets/experice/educations/edu3-web.jpg';
	import isemanticLogo from '$lib/assets/experice/conference/isemantic.png';
	import con1 from '$lib/assets/experice/conference/con1-web.jpg';
	import con2 from '$lib/assets/experice/conference/con2-web.jpg';
	import con3 from '$lib/assets/experice/conference/con3-web.jpg';
	import cvPdf from '$lib/assets/pdf/Muhammad_Jamaludin_Nur_CV_final.pdf?url';
	import paperPdf from '$lib/assets/pdf/isemantic-2025-churn-prediction.pdf?url';

	const experience = [
		{
			period: 'Jun 2026 — Present',
			role: 'Backend Developer',
			org: 'PT Monarch Inti Teknologi',
			place: 'West Jakarta, Indonesia',
			points: [
				'Building a merchant aggregator engine — one integration point that reaches six Payment Junction Providers: Beyontech, Payara, Inacash, MoneBash, Teletrans, and Winpay.',
				'Designed the automatic routing logic that picks the best PJP per request, so payments keep flowing even when one provider goes down.',
				'Architected the system so onboarding a new PJP takes minimal code change — the business can add payment partners without reworking the codebase.'
			],
			logo: monarchLogo,
			images: [mit1, mit2, mit3]
		},
		{
			period: 'Jan — Jul 2025',
			role: 'Backend Developer',
			org: 'PT Firstudio',
			place: 'Semarang (Hybrid)',
			points: [
				'Built a Citizen Management System handling 24,000+ resident records across 43 REST endpoints, so city admins manage population data across departments from one place.',
				'Secured the service with API key auth and rate limiting; shipped to a production VPS through Docker for repeatable releases.'
			],
			logo: firstudioLogo,
			logoOnDark: true,
			images: [fs1]
		},
		{
			period: 'Feb — Mar 2025',
			role: 'Web Developer Intern',
			org: 'PWM Jateng',
			place: 'Semarang',
			points: [
				"Took two divisions' event registration, donation tracking, and public info pages fully online within two months."
			],
			logo: pwmjatengLogo,
			logoOnDark: true,
			images: []
		},
		{
			period: 'Dec 2023',
			role: 'Student Mentor — Basic Programming',
			org: 'Universitas Dian Nuswantoro',
			place: 'Semarang',
			points: ['Led a 3-day workshop teaching programming fundamentals to junior students.'],
			logo: udinusLogo,
			images: []
		}
	];

	const projects = [
		{
			name: 'Enterprise Banking Microservices System',
			href: 'https://github.com/koriebruh/banking-services',
			stack: [
				'Go Fiber',
				'Spring Boot',
				'Kafka',
				'gRPC',
				'PostgreSQL',
				'Redis',
				'Spring Cloud Gateway',
				'Eureka',
				'Docker'
			],
			quote:
				'If a transfer succeeds but the notification service is down, the system retries automatically. No financial event is ever silently lost.',
			points: [
				'Six independent services — transfers, auth (TOTP 2FA + JWT), accounts, audit logs, real-time notifications — each scales without affecting the others.'
			]
		},
		{
			name: 'Bank Indonesia SNAP Payment SDK',
			href: 'https://github.com/koriebruh/go-snap-bi',
			docsHref: 'https://snap-bi.jamalkya.lol',
			stack: ['Go', 'REST API'],
			quote:
				'Zero third-party dependencies. HTTP status is authoritative over the SNAP response code — never the other way around.',
			points: [
				'79 typed endpoint bindings across all 7 ASPI SNAP portal categories — registration, balance inquiry, transaction history, credit/debit transfer — published as a versioned Go module.',
				'HMAC/RSA request signing, automatic B2B access-token refresh with single-flight caching, and server-side inbound signature verification for payment callbacks.'
			]
		}
	];

	const plannedProjects = [
		{
			name: 'Saga Orchestrator for Multi-PJP Payment Flows',
			stack: ['Go', 'Apache Kafka', 'PostgreSQL'],
			summary:
				'Compensating-transaction orchestration across payment junction providers — if step 3 of 5 fails, the saga rolls back steps 1-2 instead of leaving a merchant mid-charge.'
		},
		{
			name: 'Real-Time Transaction Fraud Scoring',
			stack: ['Go', 'gRPC', 'Redis'],
			summary:
				'Streaming risk scoring on the hot path — a Kafka consumer feeds a gRPC scoring service that flags anomalous transactions before settlement, not after.'
		},
		{
			name: 'Immutable Double-Entry Ledger Engine',
			stack: ['Go', 'PostgreSQL'],
			summary:
				'Event-sourced ledger where every balance is a projection, never a mutable field — built so "how did this balance get here" always has an audit trail.'
		}
	];

	const stats = [
		{
			value: 6,
			decimals: 0,
			suffix: '',
			label: 'Payment providers unified behind one integration'
		},
		{
			value: 79,
			decimals: 0,
			suffix: '',
			label: 'Typed SNAP endpoint bindings shipped as a Go module'
		},
		{
			value: 24,
			decimals: 0,
			suffix: 'K+',
			label: 'Residents served by a citizen management system'
		},
		{ value: 0.937, decimals: 3, suffix: '', label: 'ROC-AUC — published, IEEE Best Paper Award' }
	];

	let showPatterns = $state(false);
	let openProject = $state<(typeof projects)[number] | null>(null);

	const skills = [
		{ group: 'Languages', items: ['Go', 'Java', 'TypeScript', 'Python', 'Rust', 'SQL'] },
		{
			group: 'Frameworks & APIs',
			items: ['Spring Boot', 'Go Fiber', 'Gin', 'GORM', 'gRPC', 'REST API', 'WebSocket']
		},
		{
			group: 'Databases & Messaging',
			items: [
				'PostgreSQL',
				'MySQL',
				'ClickHouse',
				'Redis',
				'Valkey',
				'Elasticsearch',
				'Apache Kafka',
				'RabbitMQ'
			]
		},
		{
			group: 'Observability & Workflow',
			items: ['Prometheus', 'Grafana', 'Jaeger', 'OpenTelemetry', 'Temporal', 'k6']
		},
		{
			group: 'DevOps & Architecture',
			items: ['Docker', 'MinIO', 'VPS', 'Git', 'Linux', 'Microservices']
		}
	];
</script>

<svelte:head>
	<title>JamalKya Nanami (菜々美) — Backend Engineer</title>
	<meta
		name="description"
		content="Backend engineer building payment routing and microservices infrastructure — Go, Spring Boot, Kafka, PostgreSQL."
	/>
</svelte:head>

<main id="top">
	<!-- HERO + ABOUT -->
	<section class="relative isolate flex min-h-[88vh] items-center overflow-hidden sm:min-h-screen">
		<PlasmaField />
		<div class="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
			<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
				<div>
					<div
						use:enter
						class="reveal mb-7 flex items-center gap-2 font-mono text-[11px] text-text-muted uppercase"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-accent shadow-(--shadow-glow)"></span>
						available for backend roles · vienna, at (utc+1)
					</div>

					<p
						use:enter={{ delay: 80 }}
						class="reveal mb-6 inline-block rounded-lg bg-accent px-3 py-1 font-mono text-xs font-semibold text-void uppercase"
					>
						backend engineer — payment infrastructure
					</p>

					<h1
						use:enter={{ delay: 160 }}
						class="reveal mb-3 font-display text-6xl leading-[0.95] font-bold tracking-tight text-text-primary sm:text-8xl lg:text-[6.5rem]"
					>
						JamalKya Nanami
					</h1>
					<p use:enter={{ delay: 220 }} class="reveal mb-3 flex items-center gap-2.5">
						<span class="font-mono text-xs tracking-wide text-text-faint uppercase">aka</span>
						<span class="font-display text-2xl text-accent sm:text-3xl">菜々美</span>
					</p>
					<p use:enter={{ delay: 250 }} class="reveal mb-8 text-sm text-text-muted italic">
						壊れないものを作る — I build things that don't break.
					</p>

					<p
						use:enter={{ delay: 280 }}
						class="reveal mb-5 max-w-xl text-lg text-text-primary sm:text-2xl"
					>
						I build the routing layer between merchants and payment providers — the layer that isn't
						allowed to drop a transaction.
					</p>

					<p
						use:enter={{ delay: 340 }}
						class="reveal max-w-xl text-sm leading-relaxed text-text-muted sm:text-base"
					>
						I work on the parts of a payment system that aren't allowed to fail quietly: transaction
						routing, retries, idempotency, audit trails. At Monarch Inti Teknologi I'm building the
						aggregator that lets one merchant integration reach six payment providers, with
						automatic failover when one goes down. Before that, at Firstudio, I shipped a citizen
						management system that now serves 24,000+ residents across departments.
					</p>
				</div>

				<div use:enter={{ delay: 120 }} class="reveal relative w-64 sm:w-72 lg:w-80">
					<div
						use:parallax={{ amount: 8 }}
						class="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-text-primary/10"
					>
						<img
							src={mePhoto}
							alt="JamalKya Nanami (菜々美)"
							class="aspect-[4/5] w-full object-cover"
							style="object-position: 50% 22%;"
						/>
						<div
							class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void/90 to-transparent"
						></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- PROOF STRIP -->
	<section class="bg-text-primary/[0.025] py-14">
		<div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:grid-cols-4 sm:px-8">
			{#each stats as stat, i (stat.label)}
				<div>
					<p
						use:countUp={{
							value: stat.value,
							decimals: stat.decimals,
							suffix: stat.suffix,
							delay: i * 70
						}}
						class="mb-1 font-display text-3xl font-bold text-text-primary sm:text-4xl"
					>
						0
					</p>
					<p class="text-xs leading-snug text-text-muted">{stat.label}</p>
				</div>
			{/each}
		</div>
	</section>

	<div class="mx-auto max-w-7xl px-5 sm:px-8">
		<!-- EXPERIENCE -->
		<section id="experience" class="scroll-mt-20 py-20 sm:py-28">
			<h2
				class="mb-10 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl"
			>
				Where I've worked
			</h2>
			<div class="relative space-y-12">
				<div
					class="absolute top-2 bottom-2 -left-4 hidden w-px bg-[repeating-linear-gradient(to_bottom,var(--color-accent)_0,var(--color-accent)_4px,transparent_4px,transparent_10px)] opacity-40 sm:block"
				></div>
				{#each experience as job (job.period)}
					<div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr]">
							<div class="relative">
								<span
									class="absolute top-1 -left-4 hidden h-2 w-2 -translate-x-1/2 rounded-full border-2 border-void bg-accent sm:block"
								></span>
								<p class="font-mono text-xs text-text-faint">{job.period}</p>
							</div>
							<div>
								<div class="mb-4 flex items-center gap-4 border-b border-text-primary/10 pb-4">
									<LogoSlot name={job.org} src={job.logo} onDark={job.logoOnDark} />
									<div class="min-w-0">
										<h3 class="text-base font-semibold text-text-primary sm:text-lg">
											{job.role}
										</h3>
										<p class="text-sm text-text-muted">{job.org} · {job.place}</p>
									</div>
								</div>
								<ul class="space-y-2">
									{#each job.points as point (point)}
										<li class="flex gap-2 text-sm text-text-muted sm:text-base">
											<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint"></span>
											{point}
										</li>
									{/each}
								</ul>
								{#if job.images.length > 0}
									<ImagePlaceholder
										label="drop a screenshot or photo here"
										class="mt-4"
										layout="row"
										images={job.images}
									/>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- EDUCATION & RESEARCH -->
		<section id="education" class="scroll-mt-20 py-20 sm:py-28">
			<h2
				class="mb-10 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl"
			>
				What I've studied
			</h2>
			<div class="relative space-y-12">
				<div
					class="absolute top-2 bottom-2 -left-4 hidden w-px bg-[repeating-linear-gradient(to_bottom,var(--color-accent)_0,var(--color-accent)_4px,transparent_4px,transparent_10px)] opacity-40 sm:block"
				></div>

				<!-- Education -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr]">
					<div class="relative">
						<span
							class="absolute top-1 -left-4 hidden h-2 w-2 -translate-x-1/2 rounded-full border-2 border-void bg-accent sm:block"
						></span>
						<p class="font-mono text-xs text-text-faint">2022 — Feb 2026</p>
					</div>
					<div>
						<div class="mb-4 flex items-center gap-4 border-b border-text-primary/10 pb-4">
							<LogoSlot name="UDINUS" src={udinusLogo} />
							<div class="min-w-0">
								<h3 class="text-base font-semibold text-text-primary sm:text-lg">
									B.Sc. Informatics Engineering
								</h3>
								<p class="text-sm text-text-muted">
									Universitas Dian Nuswantoro (UDINUS) · Semarang
								</p>
							</div>
						</div>
						<p class="mb-4 font-mono text-xs text-text-faint">
							GPA 3.65 / 4.00 · 146 credits · 0 failing grades across 54 courses
						</p>
						<ImagePlaceholder label="campus photo" layout="row" images={[edu1, edu2, edu3]} />
					</div>
				</div>

				<!-- Research, published during the degree above -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr]">
					<div class="relative">
						<span
							class="absolute top-1 -left-4 hidden h-2 w-2 -translate-x-1/2 rounded-full border-2 border-void bg-accent sm:block"
						></span>
						<p class="font-mono text-xs text-text-faint">December 2025</p>
					</div>
					<div>
						<div class="mb-6 flex items-center gap-4 border-b border-text-primary/10 pb-4">
							<LogoSlot name="ISEMANTIC 2025" src={isemanticLogo} onDark />
							<div class="min-w-0">
								<h3 class="text-base font-semibold text-text-primary sm:text-lg">
									Best Paper Award
								</h3>
								<p class="text-sm text-text-muted">IEEE Xplore · ISEMANTIC 2025</p>
							</div>
						</div>

						<div class="grid gap-8 sm:grid-cols-2">
							<ImagePlaceholder label="conference photos" images={[con1, con2, con3]} />

							<div>
								<h3 class="mb-2 text-base font-medium text-text-primary sm:text-lg">
									Improving Customer Churn Prediction Using Domain-Driven Feature Engineering,
									Resampling, and CatBoost with Explainability Extensions
								</h3>
								<p class="mb-4 text-sm text-text-muted">
									An end-to-end churn prediction pipeline on the IBM Telco Customer Churn dataset
									(7,043 samples, 26.54% churn): SMOTE for class imbalance, domain-specific
									engineered features, and CatBoost/XGBoost tuned with Optuna. The best model
									reached a <span class="text-accent">0.937 ROC-AUC</span> and 0.863 F1-score. SHAP explains
									which features drive each prediction, DICE-ML generates counterfactual "what would change
									the outcome" explanations for retention teams, and a fairness audit surfaced a 22.55%
									bias toward senior citizens worth correcting for.
								</p>
								<div class="flex flex-wrap gap-3">
									<Button
										variant="outline"
										size="sm"
										href={paperPdf}
										target="_blank"
										rel="noreferrer">Read the paper (PDF)</Button
									>
									<Button
										variant="outline"
										size="sm"
										href="https://ieeexplore.ieee.org/document/11291801/"
										target="_blank"
										rel="noreferrer">View on IEEE Xplore ↗</Button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- FEATURED PROJECTS -->
		<section id="projects" class="scroll-mt-20 py-20 sm:py-28">
			<h2
				class="mb-10 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl"
			>
				Things I've shipped
			</h2>

			<!-- hero project -->
			{#if projects[0]}
				{@const hero = projects[0]}
				<button
					type="button"
					onclick={() => (openProject = hero)}
					class="group block w-full text-left"
				>
					<Card
						class="mb-5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl sm:p-12"
					>
						<CardContent>
							<div class="mb-6 flex flex-wrap items-start justify-between gap-4">
								<h3 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">
									{hero.name}
								</h3>
								<span
									class="mt-1 shrink-0 font-mono text-xs text-text-faint group-hover:text-accent"
									>View details</span
								>
							</div>
							<div class="mb-6 flex flex-wrap gap-1.5">
								{#each hero.stack as tech (tech)}
									{#if hasTechIcon(tech)}
										<Badge variant="up" class="p-1.5" title={tech}
											><TechIcon name={tech} /><span class="sr-only">{tech}</span></Badge
										>
									{:else}
										<Badge variant="up">{tech}</Badge>
									{/if}
								{/each}
							</div>
							<p
								class="mb-6 max-w-2xl rounded-lg border-l-2 border-accent bg-text-primary/5 px-4 py-3 text-base text-text-primary italic sm:text-lg"
							>
								"{hero.quote}"
							</p>
							<ul class="max-w-2xl space-y-2">
								{#each hero.points as point (point)}
									<li class="flex gap-2 text-sm text-text-muted">
										<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint"></span>
										{point}
									</li>
								{/each}
							</ul>
						</CardContent>
					</Card>
				</button>
			{/if}

			<!-- secondary: rest of shipped + what's next -->
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each projects.slice(1) as project (project.name)}
					<button
						type="button"
						onclick={() => (openProject = project)}
						class="block h-full w-full text-left"
					>
						<Card class="h-full p-5 hover:border-accent/40">
							<CardContent class="flex h-full flex-col">
								<h3 class="mb-3 text-sm font-semibold text-text-primary">{project.name}</h3>
								<div class="mb-3 flex flex-wrap gap-1.5">
									{#each project.stack as tech (tech)}
										{#if hasTechIcon(tech)}
											<Badge variant="up" class="p-1.5" title={tech}
												><TechIcon name={tech} /><span class="sr-only">{tech}</span></Badge
											>
										{:else}
											<Badge variant="up">{tech}</Badge>
										{/if}
									{/each}
								</div>
								<p class="mb-4 text-xs leading-relaxed text-text-muted">{project.quote}</p>
								<div class="mt-auto flex gap-4">
									<a
										href={project.href}
										target="_blank"
										rel="noreferrer"
										onclick={(e) => e.stopPropagation()}
										class="font-mono text-[10px] text-text-faint hover:text-accent">View source</a
									>
									{#if project.docsHref}
										<a
											href={project.docsHref}
											target="_blank"
											rel="noreferrer"
											onclick={(e) => e.stopPropagation()}
											class="font-mono text-[10px] text-text-faint hover:text-accent">Docs</a
										>
									{/if}
								</div>
							</CardContent>
						</Card>
					</button>
				{/each}
				{#each plannedProjects as project (project.name)}
					<div class="flex flex-col border border-dashed border-text-primary/15 p-5">
						<span
							class="mb-3 inline-flex w-fit items-center rounded-lg bg-text-primary/5 px-2 py-0.5 font-mono text-[10px] text-text-faint uppercase"
							>planned</span
						>
						<h4 class="mb-2 text-sm font-semibold text-text-primary">{project.name}</h4>
						<p class="mb-4 text-xs leading-relaxed text-text-muted">{project.summary}</p>
						<div class="mt-auto flex flex-wrap gap-1.5">
							{#each project.stack as tech (tech)}
								{#if hasTechIcon(tech)}
									<Badge variant="up" class="p-1.5" title={tech}
										><TechIcon name={tech} /><span class="sr-only">{tech}</span></Badge
									>
								{:else}
									<Badge variant="up">{tech}</Badge>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- SKILLS -->
		<section id="stack" class="scroll-mt-20 py-20 sm:py-28">
			<h2
				class="mb-10 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl"
			>
				What I work with
			</h2>
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each skills as group (group.group)}
					<div>
						<p class="mb-3 text-xs text-text-faint uppercase">{group.group}</p>
						<div class="flex flex-wrap gap-2">
							{#each group.items as item (item)}
								{#if item === 'Microservices'}
									<button
										type="button"
										onclick={() => (showPatterns = !showPatterns)}
										aria-expanded={showPatterns}
										class="glass inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11px] font-medium text-text-muted transition-colors hover:text-accent"
									>
										Microservices
										<svg
											viewBox="0 0 24 24"
											width="11"
											height="11"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											class="transition-transform duration-200"
											class:rotate-180={showPatterns}
										>
											<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</button>
								{:else if hasTechIcon(item)}
									<Badge variant="up" class="p-1.5" title={item}
										><TechIcon name={item} /><span class="sr-only">{item}</span></Badge
									>
								{:else}
									<Badge variant="up">{item}</Badge>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>

			{#if showPatterns}
				<div class="mt-8">
					<p class="mb-3 font-mono text-[11px] text-text-faint uppercase">
						Patterns I've worked with
					</p>
					<ArchPatterns />
				</div>
			{/if}
		</section>

		<!-- CONTACT / FOOTER -->
		<section id="contact" class="scroll-mt-20 py-20 sm:py-28">
			<div class="mb-8 flex items-center gap-3">
				<LottiePulse />
				<p class="font-mono text-xs tracking-wide text-accent uppercase">available for new roles</p>
			</div>

			<h2 class="mb-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
				Open to <span class="text-accent">backend roles</span>.
			</h2>
			<p class="mb-10 max-w-lg text-text-muted">
				If you're hiring for payment infrastructure, distributed systems, or backend work in general
				— reach out directly.
			</p>

			<div class="flex flex-wrap items-center gap-3">
				<a
					href="mailto:mjamaludinnur927@gmail.com"
					title="Email"
					class="inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 transition-colors hover:border-accent/40"
				>
					<ContactIcon name="email" />
				</a>
				<a
					href="https://wa.me/628818653880"
					target="_blank"
					rel="noreferrer"
					title="WhatsApp"
					class="inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 transition-colors hover:border-accent/40"
				>
					<ContactIcon name="whatsapp" />
				</a>
				<a
					href="https://github.com/koriebruh"
					target="_blank"
					rel="noreferrer"
					title="GitHub"
					class="inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 transition-colors hover:border-accent/40"
				>
					<ContactIcon name="github" />
				</a>
				<a
					href="https://www.linkedin.com/in/mjamaludinnur/"
					target="_blank"
					rel="noreferrer"
					title="LinkedIn"
					class="inline-flex h-12 w-12 items-center justify-center border border-text-primary/10 transition-colors hover:border-accent/40"
				>
					<ContactIcon name="linkedin" />
				</a>
				<Button href={cvPdf} download="JamalKya Nanami - CV.pdf">Download portfolio (PDF)</Button>
			</div>

			<div
				class="mt-10 flex flex-col gap-1 pt-6 font-mono text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between"
			>
				<p>© {new Date().getFullYear()} JamalKya Nanami (菜々美). All rights reserved.</p>
				<p>Vienna, Austria — UTC+1</p>
			</div>
		</section>
	</div>
</main>

<ProjectModal project={openProject} onclose={() => (openProject = null)} />
