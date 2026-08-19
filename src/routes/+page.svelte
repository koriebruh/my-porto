<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Badge from '$lib/components/ui/badge.svelte';
	import ImagePlaceholder from '$lib/components/image-placeholder.svelte';
	import LogoSlot from '$lib/components/logo-slot.svelte';
	import TechIcon, { hasTechIcon } from '$lib/components/tech-icon.svelte';
	import ArchPatterns from '$lib/components/arch-patterns.svelte';
	import { reveal } from '$lib/actions/reveal';

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
				'Building a merchant aggregator engine — one integration point that reaches six Payment Junction Providers: Beyontech, Payara, Inacash, Moneyball, Teletrans, and Winpay.',
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
			name: 'Payment Gateway Integration — Midtrans',
			href: 'https://github.com/koriebruh/payment-service',
			stack: ['Go', 'PostgreSQL', 'Redis', 'Apache Kafka', 'Docker'],
			quote: 'No duplicate charges. No data loss on crash. No balance conflicts.',
			points: [
				'Detects double-submits before they charge twice, saves records locally before confirming so a crash never drops a transaction, and blocks two simultaneous payments on one account.',
				'Auto-pauses requests when Midtrans is unavailable instead of flooding the provider — keeps the system stable through outages.'
			]
		}
	];

	let showPatterns = $state(false);

	const skills = [
		{ group: 'Languages', items: ['Go', 'Java', 'Python', 'SQL'] },
		{
			group: 'Frameworks & APIs',
			items: [
				'Spring Boot',
				'Spring Cloud Gateway',
				'Go Fiber',
				'Gin',
				'gRPC',
				'REST API',
				'WebSocket'
			]
		},
		{ group: 'Databases & Messaging', items: ['PostgreSQL', 'MySQL', 'Redis', 'Apache Kafka'] },
		{
			group: 'DevOps & Architecture',
			items: ['Docker', 'VPS', 'Git', 'Eureka', 'Microservices']
		}
	];
</script>

<svelte:head>
	<title>Muhammad Jamaludin Nur — Backend Engineer</title>
	<meta
		name="description"
		content="Backend engineer building payment routing and microservices infrastructure — Go, Spring Boot, Kafka, PostgreSQL."
	/>
</svelte:head>

<main class="mx-auto max-w-5xl px-5 sm:px-8">
	<!-- HERO -->
	<section class="pt-16 pb-14 sm:pt-24 sm:pb-20">
		<div class="mb-8 flex items-center gap-2 font-mono text-[11px] text-text-muted uppercase">
			<span class="h-1.5 w-1.5 rounded-full bg-accent shadow-(--shadow-glow)"></span>
			available for backend roles · west jakarta, id (utc+7)
		</div>

		<p
			class="mb-4 inline-block rounded-none bg-accent px-3 py-1 font-mono text-xs font-semibold text-void uppercase"
		>
			backend engineer — payment infrastructure
		</p>

		<h1 class="mb-6 font-display text-4xl leading-[1.05] font-bold text-text-primary sm:text-6xl">
			Muhammad Jamaludin Nur
		</h1>

		<p class="mb-3 max-w-2xl text-lg text-text-primary sm:text-xl">
			I build the routing layer between merchants and payment providers — the layer that isn't
			allowed to drop a transaction.
		</p>

		<p class="mb-8 max-w-2xl text-sm text-text-muted sm:text-base">
			Currently at Monarch Inti Teknologi, building a merchant aggregator that keeps payments
			flowing across six providers even when one of them goes down.
		</p>

		<div class="mb-12 flex flex-wrap gap-4">
			<Button href="mailto:mjamaludinnur927@gmail.com">Email me</Button>
			<Button variant="outline" href="https://github.com/koriebruh" target="_blank" rel="noreferrer"
				>GitHub</Button
			>
			<Button
				variant="outline"
				href="https://www.linkedin.com/in/mjamaludinnur/"
				target="_blank"
				rel="noreferrer">LinkedIn</Button
			>
		</div>
	</section>

	<!-- ABOUT -->
	<section use:reveal class="reveal max-w-2xl py-16 sm:py-20">
		<h2 class="mb-5 font-mono text-xs text-text-faint uppercase">about</h2>
		<p class="text-lg leading-relaxed text-text-primary sm:text-xl">
			I work on the parts of a payment system that aren't allowed to fail quietly: transaction
			routing, retries, idempotency, audit trails. At Monarch Inti Teknologi I'm building the
			aggregator that lets one merchant integration reach six payment providers, with automatic
			failover when one goes down. Before that, at Firstudio, I shipped a citizen management system
			that now serves 24,000+ residents across departments.
		</p>
	</section>

	<!-- EXPERIENCE -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-10 font-mono text-xs text-text-faint uppercase">experience</h2>
		<div class="relative space-y-12">
			<div
				class="absolute top-2 bottom-2 -left-4 hidden w-px bg-[repeating-linear-gradient(to_bottom,var(--color-accent)_0,var(--color-accent)_4px,transparent_4px,transparent_10px)] opacity-40 sm:block"
			></div>
			{#each experience as job, i (job.period)}
				<div use:reveal class="reveal" style="transition-delay: {i * 60}ms">
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr]">
						<div class="relative">
							<span
								class="absolute top-1 -left-4 hidden h-2 w-2 -translate-x-1/2 rounded-full border-2 border-void bg-accent sm:block"
							></span>
							<p class="font-mono text-xs text-text-faint">{job.period}</p>
						</div>
						<div>
							<div class="mb-1 flex items-center gap-3">
								<LogoSlot name={job.org} src={job.logo} onDark={job.logoOnDark} />
								<h3 class="text-base font-medium text-text-primary sm:text-lg">
									{job.role} <span class="text-text-muted">· {job.org}</span>
								</h3>
							</div>
							<p class="mb-3 text-xs text-text-faint">{job.place}</p>
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

	<!-- FEATURED PROJECTS -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-10 font-mono text-xs text-text-faint uppercase">featured projects</h2>
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project, i (project.name)}
				<a
					use:reveal
					href={project.href}
					target="_blank"
					rel="noreferrer"
					class="glass reveal group flex flex-col rounded-none p-6 transition-colors hover:border-accent/40"
					style="transition-delay: {i * 80}ms"
				>
					<h3 class="mb-3 text-lg font-medium text-text-primary">{project.name}</h3>
					<div class="mb-4 flex flex-wrap gap-1.5">
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
					<p
						class="mb-4 rounded-none border-l-2 border-accent bg-white/5 px-3 py-2 text-sm text-text-primary italic"
					>
						"{project.quote}"
					</p>
					<ul class="mb-5 space-y-2">
						{#each project.points as point (point)}
							<li class="flex gap-2 text-sm text-text-muted">
								<span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint"></span>
								{point}
							</li>
						{/each}
					</ul>
					<span class="mt-auto font-mono text-xs text-text-faint uppercase group-hover:text-accent"
						>view source →</span
					>
				</a>
			{/each}
		</div>
	</section>

	<!-- RESEARCH -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-6 font-mono text-xs text-text-faint uppercase">research &amp; publication</h2>

		<div class="glass mb-6 flex flex-col gap-4 rounded-none p-6 sm:flex-row sm:items-center">
			<LogoSlot name="ISEMANTIC 2025" src={isemanticLogo} onDark />
			<div>
				<Badge variant="paper" class="mb-2">best paper award</Badge>
				<p class="text-text-primary">
					First author, peer-reviewed paper on customer churn prediction (CatBoost + domain feature
					engineering) — awarded Best Paper at IEEE Xplore, ISEMANTIC 2025.
				</p>
				<p class="mt-1 text-xs text-text-faint">December 2025</p>
			</div>
		</div>

		<div class="grid gap-8 sm:grid-cols-2">
			<ImagePlaceholder label="conference photos" images={[con1, con2, con3]} />

			<div>
				<h3 class="mb-2 text-base font-medium text-text-primary sm:text-lg">
					Improving Customer Churn Prediction Using Domain-Driven Feature Engineering, Resampling,
					and CatBoost with Explainability Extensions
				</h3>
				<p class="mb-4 text-sm text-text-muted">
					An end-to-end churn prediction pipeline on the IBM Telco Customer Churn dataset (7,043
					samples, 26.54% churn): SMOTE for class imbalance, domain-specific engineered features,
					and CatBoost/XGBoost tuned with Optuna. The best model reached a <span class="text-accent"
						>0.937 ROC-AUC</span
					>
					and 0.863 F1-score. SHAP explains which features drive each prediction, DICE-ML generates counterfactual
					"what would change the outcome" explanations for retention teams, and a fairness audit surfaced
					a 22.55% bias toward senior citizens worth correcting for.
				</p>
				<div class="flex flex-wrap gap-3">
					<Button variant="outline" size="sm" href={paperPdf} target="_blank" rel="noreferrer"
						>Read the paper (PDF)</Button
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
	</section>

	<!-- SKILLS -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-10 font-mono text-xs text-text-faint uppercase">stack</h2>
		<div class="grid gap-8 sm:grid-cols-2">
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
									class="glass inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 font-mono text-[11px] font-medium text-text-muted transition-colors hover:text-accent"
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
					↳ patterns I've worked with
				</p>
				<ArchPatterns />
			</div>
		{/if}
	</section>

	<!-- EDUCATION -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-6 font-mono text-xs text-text-faint uppercase">education</h2>
		<div class="mb-1 flex items-center gap-3">
			<LogoSlot name="UDINUS" src={udinusLogo} />
			<h3 class="text-base text-text-primary sm:text-lg">B.Sc. Informatics Engineering</h3>
		</div>
		<p class="mb-3 text-sm text-text-muted">
			Universitas Dian Nuswantoro (UDINUS) · Semarang · 2022 — Feb 2026
		</p>
		<p class="mb-4 font-mono text-xs text-text-faint">
			GPA 3.65 / 4.00 · 146 credits · 0 failing grades across 54 courses
		</p>
		<ImagePlaceholder label="campus photo" layout="row" images={[edu1, edu2, edu3]} />
	</section>

	<!-- CONTACT / FOOTER -->
	<section use:reveal class="reveal border-t border-white/10 py-16 sm:py-20">
		<h2 class="mb-4 font-display text-2xl font-bold text-text-primary sm:text-3xl">
			Open to <span class="text-accent">backend roles</span>.
		</h2>
		<p class="mb-8 max-w-lg text-text-muted">
			If you're hiring for payment infrastructure, distributed systems, or backend work in general —
			reach out directly.
		</p>
		<div class="mb-10 flex flex-wrap gap-4">
			<Button href="mailto:mjamaludinnur927@gmail.com">mjamaludinnur927@gmail.com</Button>
			<Button variant="outline" href="https://wa.me/628818653880" target="_blank" rel="noreferrer"
				>WhatsApp</Button
			>
			<Button variant="outline" href="https://github.com/koriebruh" target="_blank" rel="noreferrer"
				>GitHub</Button
			>
			<Button
				variant="outline"
				href="https://www.linkedin.com/in/mjamaludinnur/"
				target="_blank"
				rel="noreferrer">LinkedIn</Button
			>
		</div>
		<Button href={cvPdf} download="Muhammad Jamaludin Nur - CV.pdf" class="mb-10"
			>Download portfolio (PDF)</Button
		>
		<p class="border-t border-white/10 pt-6 font-mono text-xs text-text-faint">
			west jakarta, indonesia — utc+7
		</p>
	</section>
</main>
